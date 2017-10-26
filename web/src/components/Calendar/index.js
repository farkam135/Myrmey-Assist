import React, { Component } from 'react';
import Day from "./Day/"

export const START_HOUR = 6;
export const END_HOUR = 23;
export const TABLE_WIDTH_PERCENTAGE = 50;
export const HEADER_COLOR = "#0063A4";
export const TIME_COLOR = "#FFD202";
export const CELL_COLOR = "#eee";

const CLASS_SCHEDULE = 
{
    "COMPSCI 143B": {
        "YearTerm": "2017-92",
        "code": "34150",
        "days": "Tu Th",
        "dept": "COMPSCI",
        "instructor": "BIC, L.",
        "location": "BS3 1200",
        "num": "143B",
        "time": "1:00- 1:50p",
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
            "COMPSCI 161L": {
                "YearTerm": "2017-92",
                "code": "34190",
                "days": "Fr",
                "dept": "COMPSCI",
                "instructor": "DILLENCOURT, M.",
                "location": "SSLH 100",
                "num": "161L",
                "time": "4:00- 4:50p",
                "title": "DES&ANALYS OF ALGOR LAB",
            }
        }
    }
};

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
        this.populateCalendar(CLASS_SCHEDULE);
    }
    
    retrieveRandomColor() {
        let colors = ["#20b2aa", "#cd5c5c", "#ba55d3", "#4169e1", "#ff6347", "#32cd32"]
        return colors[Math.floor(Math.random()*colors.length)];
    }

    populateCalendar(classes, color) {
        Object.keys(classes).forEach((key) => {  
            const days = classes[key].days.split(" ");
            classes[key]["color"] = color ? color : this.retrieveRandomColor();
            days.forEach((day) => {
                if (day === "Mo") {
                    this.state.classes.Monday.push(classes[key]);
                } else if (day === "Tu") {
                    this.state.classes.Tuesday.push(classes[key]);
                } else if (day === "We") {
                    this.state.classes.Wednesday.push(classes[key]);
                } else if (day === "Th") {
                    this.state.classes.Thursday.push(classes[key]);
                } else if (day === "Fr") {
                    this.state.classes.Friday.push(classes[key]);
                } else {
                    console.log("An error has occurred with the days!");
                }
            }) 
            if (classes[key]["DIS"]) {
                this.populateCalendar(classes[key]["DIS"], classes[key]["color"]);
            }
        });
    }

    renderHourHeaders() {
        let hourSlots = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            hourSlots.push((
                <div className="column" key={hour} style={timeCell}>
                    {hour <= 12 ? hour : hour - 12}{hour >= 12 ? "PM" : "AM"}
                </div>
            ));
        }
        return hourSlots;
    }

    render() {
        return (
            <div style={container}>
                <div className="columns is-mobile" style={header}>
                    <div className="column is-narrow"><div style={{width: "50px"}}/></div>
                    <div className="column">Mon</div>
                    <div className="column">Tues</div>
                    <div className="column">Wed</div>
                    <div className="column">Thurs</div>
                    <div className="column">Fri</div>
                </div>     
                <div className="columns is-mobile" style={timeContainer}>
                    <div style={{display:"flex", flexDirection: "column", width: `${TABLE_WIDTH_PERCENTAGE/2}%`}}>
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

const container = {
    width: `${TABLE_WIDTH_PERCENTAGE}%`,
    //overflow: "auto" //uncomment this out to add scroll only on this component
}
const header =  {
    fontFamily:"Tahoma", 
    fontSize: 18,
    fontWeight: "bold", 
    backgroundColor: HEADER_COLOR, 
    color: "white", 
    textAlign: "center",
    //textDecorationLine: "underline"
}
const timeContainer = {
    fontFamily:"Tahoma", 
    fontSize: 16,
    fontWeight: "bold", 
    color: "white", 
    textAlign: "center"
}
const timeCell = {
    backgroundColor: TIME_COLOR, 
    //border:"1px solid black", 
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "black",
    borderLeft: 0, 
    borderTop: 0
}

export default Calendar;
