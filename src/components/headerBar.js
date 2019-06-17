import React from 'react';
import {getMonth} from '../helper'
export default class HeaderBar extends React.Component{
    render(){
        const {currentMonth, currentYear} = this.props;
        return(
            <div className="row">
                    <div className="arrows col-sm-1" onClick={() => currentMonth === 0 ? null : this.props.onPrev()}> 
                        <span className="glyphicon leftArrow glyphicon-menu-left"></span>
                    </div>
                    <div className="col-sm-10 currentDate">
                        {getMonth(currentMonth)}, {currentYear}
                    </div>
                    <div className="arrows col-sm-1" onClick={() => currentMonth === 11 ? null : this.props.onNext()} >
                        <span className="glyphicon rightArrow glyphicon-menu-right"></span>
                    </div>
            </div>
        )
    }
}