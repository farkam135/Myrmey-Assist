import React, { Component } from 'react';
import Day from "./Day/"

export const START_HOUR = 6;
export const END_HOUR = 23;
const CLASS_COLORS = ["#deb887", "#20b2aa", "#cd5c5c", "#ba55d3", "#4169e1", "#ff6347", "#32cd32"]

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
            colorIndex: 0
        }
    }

    componentWillMount() {
        for (let i = CLASS_COLORS.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = CLASS_COLORS[i];
            CLASS_COLORS[i] = CLASS_COLORS[j];
            CLASS_COLORS[j] = temp;
        }

        this.populateCalendar(this.props.classSchedule);
    }

    populateCalendar(classes, color) {
        Object.keys(classes).forEach((key) => {  
            const days = classes[key].days.split(" ");
            classes[key]["color"] = color ? color : CLASS_COLORS[this.state.colorIndex++];
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
                <div className="column timeCell" key={hour}>
                    {hour <= 12 ? hour : hour - 12}{hour >= 12 ? "PM" : "AM"}
                </div>
            ));
        }
        return hourSlots;
    }

    render() {
        return (
            <div className="widthContainer">
                <div className="columns is-mobile header" >
                    <div className="column is-narrow"><div style={{width: "50px"}}/></div>
                    <div className="column">Mon</div>
                    <div className="column">Tues</div>
                    <div className="column">Wed</div>
                    <div className="column">Thurs</div>
                    <div className="column">Fri</div>
                </div>     
                <div className="columns is-mobile timeContainer">
                    <div className="hourHeaders">
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

export default Calendar;
