import React, { Component } from 'react';
import {START_HOUR, END_HOUR, TABLE_WIDTH_PERCENTAGE, HEADER_COLOR, CELL_COLOR} from "../";

const CELL_HEIGHT_PX = 66;
const BORDER_WIDTH = 1.3;

class Hour extends Component {
    renderClasses() {
        let classes = [];
        this.props.classes.forEach((_class, index) => {
            const time = _class.time.split(" - ");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = parseInt(startTime[0]);
            const startMinute = parseInt(startTime[1]);
            const endHour = parseInt(endTime[0]);
            const endMinute = parseInt(endTime[1].slice(0,-1));

            let minDifference = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute))/60;
            let top = startMinute/60 * CELL_HEIGHT_PX;
            let bottom = (minDifference * CELL_HEIGHT_PX) + top - CELL_HEIGHT_PX;//570 - 420 = 150
            bottom = minDifference > 60 ? (BORDER_WIDTH * Math.floor(minDifference)) * -1 : bottom * -1

            classes.push(
                <div style={Object.assign({}, classContainer, {top: top, bottom: bottom})} key={index}>
                    <div style={font}>
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
            <div className="column" style={Object.assign({}, hourContainer, {backgroundColor:CELL_COLOR})}>
                {this.renderClasses()}
                &nbsp;
            </div>
        )
    }
}

const hourContainer = {
    position: "relative", 
    overflow: "visible", 
    //border:"1px solid black", 
    borderStyle: "dotted",
    borderWidth: 1.3,
    borderColor: "black",
    borderLeft: 0, 
    borderTop: 0,
    paddingBottom: 30,
}
const classContainer = {
    backgroundColor:"#20b2aa", 
    position: "absolute", 
    left : 0, 
    right: 0, 
    zIndex: 1,
    borderRadius: 10
}
const font = {
    fontSize: 10
}

export default Hour;
