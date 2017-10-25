import React, { Component } from 'react';
import Hour from "./Hour/"
import Day from "./Day/"

export const START_HOUR = 6;
export const END_HOUR = 22;
export const TABLE_WIDTH_PERCENTAGE = 50;

/*{
    "COMPSCI 143B": {
        "YearTerm": "2017-92",
        "code": "34150",
        "days": "Tu Th",
        "dept": "COMPSCI",
        "instructor": "BIC, L.",
        "location": "BS3 1200",
        "num": "143B",
        "time": "12:30- 1:50p",
        "title": "PROJ IN OPERATING SYS"
    },
    "COMPSCI 161": {
        "YearTerm": "2017-92",
        "code": "34190",
        "days": "Mo We Fr",
        "dept": "COMPSCI",
        "instructor": "DILLENCOURT, M.",
        "location": "SSLH 100",
        "num": "161",
        "time": "3:00- 3:50p",
        "title": "DES&ANALYS OF ALGOR",
        "DIS": {
            ...
        }
    },
    ...
}*/

//This component will receive an object that holds all the classes
//that a student is currently taking/plan to 
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: []
            },
        }
    }

    componentWillMount() {
        this.state.classes.Monday.push({
            dept: "COMPSCI",
            num: "161",
            time: "7:00 - 8:00p",
        })
        /*this.state.classes.Monday.push({
            dept: "COMPSCI",
            num: "132",
            time: "8:00 - 9:00p",
        })*/
    }

    renderHourHeaders() {
        let hourSlots = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            hourSlots.push((<div className="column" key={hour} 
                style={timeCell}>{hour <= 12 ? hour : hour - 12}{hour >= 12 ? "PM" : "AM"}</div>
            ));
        }
        return hourSlots;
    }

    render() {
        return (
            <div style={container}>
                <div className="columns is-mobile" style={header}>
                    <div className="column"></div>
                    <div className="column">Mon</div>
                    <div className="column">Tues</div>
                    <div className="column">Wed</div>
                    <div className="column">Thurs</div>
                    <div className="column">Fri</div>
                </div>     
                <div className="columns is-mobile" style={timeContainer}>
                    <div style={{display:"flex", flexDirection: "column", width: `${TABLE_WIDTH_PERCENTAGE}%`}}>
                        {this.renderHourHeaders()}
                    </div>
                    <Day classes={this.state.classes.Monday}/>
                    <Day classes={this.state.classes.Tuesday}/>
                    <Day classes={this.state.classes.Wednesday}/>
                    <Day classes={this.state.classes.Thursday}/>
                    <Day classes={this.state.classes.Friday}/>
                </div>
            </div>
        )
    }
}

var container = {
    width: `${TABLE_WIDTH_PERCENTAGE}%`,
}
var header =  {
    fontFamily:"Verdana", 
    fontWeight: "bold", 
    backgroundColor:"#0063A4", 
    color: "white", 
    textAlign: "center"
}
var timeContainer = {
    fontFamily:"Verdana", 
    fontWeight: "bold", 
    color: "white", 
    textAlign: "center"
}
var timeCell = {
    backgroundColor:"#FFD202", 
    border:"1px solid black", 
    borderLeft: 0, 
    borderTop: 0
}

export default Calendar;
