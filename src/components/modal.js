import React from 'react';
import {getMonth} from '../helper'
export default class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            color: "",
            hours: "00",
            minutes: "00",
            ampm: "AM"
        }
    }
    saveAppointment(e){
        e.preventDefault();
        const {title, color, hours, minutes, ampm} = this.state;
        const {dateModal, currentMonth} = this.props;
        let data = {
            title,
            color,
            time: hours+':'+minutes+' '+ampm,
            date: dateModal,
            month: getMonth(currentMonth),
            dateTime: "2019-"+getMonth(currentMonth)+"-"+dateModal+" "+hours+':'+minutes+' '+ampm
        }
        this.props.addAppointment(data);
        this.props.modal('')
    }

    render(){
        const { title, color, hours, minutes, ampm} = this.state;
        return(
            <div className="modal modalClass" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={(e) => this.props.modal("")} type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Appointment</h4>
                        </div>
                        <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 form">
                            <form onSubmit={(e) => this.saveAppointment(e)}>
                                <div className="form-group">
                                    <label className="f-left">Title</label>
                                    <input  placeholder="with Lorem Ispum" value={title} onChange={(e) => this.setState({ title: e.target.value })} required type="text" className="form-control" id="invId" />
                                </div>
                                <div className="form-group">
                                    <label className="f-left">Time</label>
                                    <div>
                                        <input type="number" min="0" max="11" placeholder="00" onChange={(e) => this.setState({ hours: e.target.value.length === 1 ? "0"+e.target.value : e.target.value })} value={hours}/>:
                                        <input type="number" min="0" max="59" placeholder="00" onChange={(e) => this.setState({ minutes: e.target.value.length === 1 ? "0"+e.target.value : e.target.value })} value={minutes} />
                                        <select value={ampm} onChange={(e) => this.setState({ampm: e.target.value})} >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="f-left">Select Color</label><br/>
                                    <div className="colorContainer">
                                        <div onClick={() => this.setState({color: '#c35d5d'})} className={color === "#c35d5d" ? "selectedColor color c1" : "color c1"} />
                                        <div onClick={() => this.setState({color: '#348ce6'})} className={color === "#348ce6" ? "selectedColor color c2" : "color c2"} />
                                        <div onClick={() => this.setState({color: '#33d430'})} className={color === "#33d430" ? "selectedColor color c3" : "color c3"} />
                                        <div onClick={() => this.setState({color: '#8151de'})} className={color === "#8151de" ? "selectedColor color c4" : "color c4"} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" >Save</button>
                                </div>
                            </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}