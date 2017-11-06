import React, { Component } from 'react';
import {CELL_COLOR} from "../";
import "../style.css"

const CELL_HEIGHT_PX = 66;

class Hour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    renderClasses() {
        let classes = [];
        this.props.classes.forEach((_class, index) => {
            const time = _class.time.split("- ");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = parseInt(startTime[0], 10);
            const startMinute = parseInt(startTime[1], 10);
            let endHour = parseInt(endTime[0], 10);
            endHour = startHour > endHour ? endHour + 12 : endHour;
            const endMinute = parseInt(endTime[1].slice(0,-1), 10);
            const am_pm = _class.time[_class.time.length-1];
            const minuteDiff = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute))/60;
            const top = startMinute/60 * CELL_HEIGHT_PX;
            let bottom = (minuteDiff * CELL_HEIGHT_PX) + top - CELL_HEIGHT_PX;//570 - 420 = 150
            bottom = minuteDiff > 60 ? (0.3 * Math.floor(minuteDiff)) * -1 : bottom * -1
            classes.push(
                <div className="classContainer" style={{backgroundColor: _class.color, top: top, bottom: bottom}} key={index}>
                    <div className="font">
                        {`${_class.time}`}<br/>
                        {`${_class.dept} ${_class.num}`}<br/>
                        {`${_class.location}`}
                    </div>
                </div>
            ); 
        })
        return classes;
    }

    render() {
        return (
            <div className="column hourContainer">
                {this.renderClasses()}
                &nbsp;
            </div>
        )
    }
}

export default Hour;
