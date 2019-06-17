import React from 'react';

import {getDaysInMonth, sortByTime} from '../helper'

import '../styles/calendar.css';
import '../styles/headerBar.css';

import { WeekDays } from '../components/weekDays';
import HeaderBar from '../components/headerBar';
import Tile from '../components/tile';
import Modal from '../components/modal';
import EditModal from '../components/editModal';

import { connect } from 'react-redux';
import * as appointmentAction from '../redux/appointment/actions';

class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            monthCalendar: getDaysInMonth(0, 2019),
            currentMonth: 0,
            currentYear: 2019,
            openModal: false,
            appointmentArray: this.props.appointment,
            dateModal: "",
            editData: {},
            editOpenModal: false
        }
    }

    onNext(){
        this.setState({
            currentMonth: this.state.currentMonth + 1,
            monthCalendar: getDaysInMonth(this.state.currentMonth + 1, 2019)
        })
    }

    onPrev(){
        this.setState({
            currentMonth: this.state.currentMonth - 1,
            monthCalendar: getDaysInMonth(this.state.currentMonth - 1, 2019)
        })
    }

    modal(dateModal){
        this.setState({
            openModal: !this.state.openModal,
            dateModal
        })
    }

    editModal(data){
        this.setState({
            editOpenModal: !this.state.editOpenModal,
            editData: data
        })
    }

    editAppointment(data){
        this.props.editAppointment(data)
    }

    addAppointment(data){
        const {appointment}= this.props;
        data.id = appointment.length === 0 ? 0 : appointment[appointment.length-1].id+1
        this.props.createAppointment(data)
    }

    removeAppointment(id){
        this.props.removeAppointment(id)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        localStorage.setItem('data', JSON.stringify(nextProps.appointment))
        return {appointmentArray: nextProps.appointment.length === 0 ? nextProps.appointment : sortByTime(nextProps.appointment)}
    }

    render(){
        const {currentMonth, currentYear, monthCalendar, appointmentArray, openModal, dateModal, editData, editOpenModal} = this.state;
        return(
            <div className="col-md-12">
                <HeaderBar currentMonth={currentMonth} onNext={() => this.onNext()} onPrev={() => this.onPrev()} currentYear={currentYear} />
                    <WeekDays/>
                    {monthCalendar.map((week, mkey) => (
                        <Tile editAppointment={(e) => this.editAppointment(e)} removeAppointment={(e) => this.removeAppointment(e)} editModal={(e) => this.editModal(e)} modal={(e) => this.modal(e)} week={week} key={mkey} appointmentArray={appointmentArray} />
                    ))}
                {openModal ? <Modal addAppointment={(e) => this.addAppointment(e) } currentMonth={currentMonth} dateModal={dateModal} modal={(e) => this.modal(e)}/> : null}
                {editOpenModal ? <EditModal editAppointment={(e) => this.editAppointment(e) } editData={editData} editModal={(e) => this.editModal(e)}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      appointment: state.appointment
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createAppointment: appointment => dispatch(appointmentAction.createAppointment(appointment)),
      removeAppointment: id => dispatch(appointmentAction.removeAppointment(id)),
      editAppointment: appointment => dispatch(appointmentAction.editAppointment(appointment))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Calendar);