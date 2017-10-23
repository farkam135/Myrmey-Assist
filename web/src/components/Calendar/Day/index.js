import React, { Component } from 'react';
import Hour from "../Hour/"
import {START_HOUR, END_HOUR, TABLE_WIDTH_PERCENTAGE} from "../";

class Day extends Component {

    renderHourSlots() {
        let rows = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            rows.push(
                <Hour day={this.props.day} classes={this.props.classes}/>
            )
        }
        return rows;
    }

    render() {
        return (
            <div style={{width:`${TABLE_WIDTH_PERCENTAGE}%`}}>
                {this.renderHourSlots()}
            </div>
        )
    }
}

export default Day;
