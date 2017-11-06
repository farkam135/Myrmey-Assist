import React, { Component } from 'react';
import Hour from "../Hour/"
import {START_HOUR, END_HOUR} from "../";
import "../style.css"

class Day extends Component {
    componentWillMount() {
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            this.setState({[hour]: []})
        }
        this.props.classes.forEach((_class) => {
            const time = _class.time.split("- ");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = startTime[0];
            const endHour = endTime[0];
            const am_pm = _class.time[_class.time.length-1];
            this.setState({[Number(startHour) + (am_pm === "p" && endHour >= startHour ? 12 : 0)] : [_class]})
        })
    }

    renderHourCells() {
        let rows = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            rows.push(
                <Hour key={hour} classes={this.state[hour]}/>
            )
        }
        return rows;
    }

    render() {
        return (
            <div className="hourCells">
                {this.renderHourCells()}
            </div>
        )
    }
}

export default Day;
