import React, { Component } from 'react';
import {START_HOUR, END_HOUR, TABLE_WIDTH_PERCENTAGE} from "../";

class Hour extends Component {
    renderClasses() {
        let classes = [];
        this.props.classes.forEach((_class, index) => {
            classes.push(
                <div style={classContainer} key={index}>
                    {`${_class.dept} ${_class.num}`}
                </div>
            ); 
        })
        return classes;
    }

    render() {
        return (
            <div className="column" style={hourContainer}>
                {this.renderClasses()}
                &nbsp;
            </div>
        )
    }
}

var hourContainer = {
    position: "relative", 
    overflow: "visible", 
    backgroundColor:"#eee", 
    border:"1px solid black", 
    borderLeft: 0, 
    borderTop: 0
}
var classContainer = {
    backgroundColor:"purple", 
    position: "absolute", 
    left : 0, 
    top: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 1
}

export default Hour;
