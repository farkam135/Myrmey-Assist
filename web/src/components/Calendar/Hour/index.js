import React, { Component } from 'react';
import {START_HOUR, END_HOUR, TABLE_WIDTH_PERCENTAGE} from "../";

class Hour extends Component {

    render() {
        return (
            <div className="column" style={{position: "relative", overflow: "visible", backgroundColor:"#eee", border:"1px solid black", borderLeft: 0, borderTop: 0}}>
                {/*<div style={{backgroundColor:"purple", position: "absolute", left : 0, top: 0, right: 0, bottom: 0, zIndex: 1}}>
                    Hello there
                </div>*/}
                {this.props.day}
            </div>
        )
    }
}

export default Hour;
