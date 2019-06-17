import React from 'react';

export default class Tile extends React.Component{
    onDragStart(e, appointment){
        e.dataTransfer.setData("appointment", JSON.stringify(appointment));
    }
    onDragOver = (e) => {
	    e.preventDefault();
    }
    onDrop = (e, day) => {
        let appointment = JSON.parse(e.dataTransfer.getData("appointment"));
        appointment.date = day.date;
        appointment.month = day.month;
        this.props.editAppointment(appointment);
	}

    render(){
        const {week, appointmentArray} = this.props
        return(
            <div className="week">
                {week.map((day, wkey) => (
                    <div onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, day)}} className={day.date === "" ? "emptyDay" : "day"} key={wkey}>
                    {day.date === "" ? null 
                        : 
                        <div>
                            <p className="dateText">
                                {day.date}
                            </p>
                            <div className="scrollEvent">
                                { appointmentArray.length === 0 ? null : appointmentArray.map((appointment, akey) => (
                                    appointment.date === day.date && appointment.month === day.month ? 
                                        <div draggable onDragStart = {(e) => this.onDragStart(e, appointment)} className="event" style={{background: appointment.color}} key={akey}>
                                            <p className="eventText">
                                                {appointment.title}
                                                <br />
                                                {appointment.time}
                                            </p>
                                            <div className="editDeleteBtn">
                                                <div className="edit">
                                                    <span onClick={() => this.props.editModal(appointment)} className="glyphicon iconSize glyphicon-edit"/>
                                                </div>
                                                <div className="delete">
                                                    <span onClick={() => this.props.removeAppointment(appointment.id)} className="glyphicon iconSize glyphicon-remove"/>
                                                </div>
                                            </div>
                                        </div>
                                    : null
                                ))}
                            </div>
                            <div className="row">
                                <div onClick={() => this.props.modal(day.date)} className="col-md-2 col-md-offset-9 addEvent">
                                    +
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                ))}
            </div>
        )
    }
}