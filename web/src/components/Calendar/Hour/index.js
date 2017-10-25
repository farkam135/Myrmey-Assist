import React, { Component } from 'react';
import {START_HOUR, END_HOUR, TABLE_WIDTH_PERCENTAGE, HEADER_COLOR, CELL_COLOR} from "../";

class Hour extends Component {
    renderClasses() {
        let classes = [];
        this.props.classes.forEach((_class, index) => {
            classes.push(
                <div style={classContainer} key={index}>
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
    top: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 1,
    borderRadius: 10
}
const font = {
    fontSize: 10
}

export default Hour;
