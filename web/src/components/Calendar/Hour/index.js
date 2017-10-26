import React, { Component } from 'react';
import {CELL_COLOR} from "../";

const CELL_HEIGHT_PX = 66;
const BORDER_WIDTH = 1.3;

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
            bottom = minuteDiff > 60 ? (BORDER_WIDTH * Math.floor(minuteDiff)) * -1 : bottom * -1
            classes.push(
                <div style={Object.assign({}, classContainer, {backgroundColor: _class.color, top: top, bottom: bottom}, this.state.hover && {transform: 'scale(1.6)',
                WebkitTransform: 'scale(1.6)', zIndex: 2, borderColor: "#FFD202"})} 
                    onMouseOver={()=>this.setState({hover: true})} onMouseOut={()=>this.setState({hover: false})} key={index}>
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
    borderStyle: "solid",
    borderWidth: BORDER_WIDTH,
    borderColor: "black",
    borderLeft: 0, 
    borderTop: 0,
    paddingBottom: 30,
}
const classContainer = {
    position: "absolute", 
    left : 0, 
    right: 0, 
    zIndex: 1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "groove",
    borderWidth: 1,
    borderColor: "black",
}
const font = {
    fontFamily:"Tahoma",
    fontSize: 12
}

export default Hour;