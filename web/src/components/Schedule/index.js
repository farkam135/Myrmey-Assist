import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';

BigCalendar.momentLocalizer(moment);

//2018/1 is just some arbitrary date where the 1st happens to land on a monday, doesn't matter since we are hiding the actual dates and just need
//to know what DAY it is. This way 1 = monday, 2 = tuesday, etc.
const BASE = new Date(2018, 0, 1, 0, 0, 0, 0);
const START_HOUR = new Date(2018, 0, 1, 6);
const END_HOUR = new Date(2018, 0, 1, 23, 59);

const CLASS_COLORS = ["#deb887", "#20b2aa", "#cd5c5c", "#ba55d3", "#4169e1", "#ff6347", "#32cd32"]
const formats = {
    dayFormat: (date, culture, localizer) => {
        return moment(date).format('ddd')
    }
}
//This component will receive an object that holds all the classes
//that a student is currently taking/plan to 
class Calendar extends Component {
    nodeStyler = (event, start, end, isSelected) => {
        return { style: { backgroundColor: event.color } }
    }

    Event = ({ event }) => {
        return (
            <span>
                <p className="is-size-7">({event.code}) <small>[{event.type}]</small></p>
                <p className="is-size-7">{event.name}</p>
            </span>
        );
    }

    getEvents = () => {
        let events = [];
        let classColorIdx = 0;
        let classColorMap = {};

        for (const code in this.props.schedule) {
            const offering = this.props.schedule[code];

            //Set offering color
            if (!classColorMap[offering.name]) {
                classColorMap[offering.name] = CLASS_COLORS[classColorIdx];
                classColorIdx++;
            }

            offering.color = classColorMap[offering.name];

            //Set offering time
            const timeString = offering.time;
            const time = /(\D+)(\d+):(\d+)\s?-\s?(\d+):(\d+)(p)?/g.exec(timeString);

            let startMins = time[3];
            let endMins = time[5];

            let startHour, endHour;
            if (time[6] === "p") {
                startHour = (parseInt(time[2]) % 12 > parseInt(time[4]) % 12) ? time[2]
                    : (parseInt(time[2]) % 12) + 12;
                endHour = (parseInt(time[4]) % 12) + 12;
            } else {
                startHour = time[2];
                endHour = time[4];
            }

            //Check the offerings days, and push it accordingly to events
            if (time[1].includes("M")) {
                events.push(Object.assign({}, offering, {
                    'start': new Date(2018, 0, 1, startHour, startMins, 0, 0),
                    'end': new Date(2018, 0, 1, endHour, endMins, 0, 0),
                }));
            }
            if (time[1].includes("Tu")) {
                events.push(Object.assign({}, offering, {
                    'start': new Date(2018, 0, 2, startHour, startMins, 0, 0),
                    'end': new Date(2018, 0, 2, endHour, endMins, 0, 0),
                }));
            }
            if (time[1].includes("W")) {
                events.push(Object.assign({}, offering, {
                    'start': new Date(2018, 0, 3, startHour, startMins, 0, 0),
                    'end': new Date(2018, 0, 3, endHour, endMins, 0, 0),
                }));
            }
            if (time[1].includes("Th")) {
                events.push(Object.assign({}, offering, {
                    'start': new Date(2018, 0, 4, startHour, startMins, 0, 0),
                    'end': new Date(2018, 0, 4, endHour, endMins, 0, 0),
                }));
            }
            if (time[1].includes("F")) {
                events.push(Object.assign({}, offering, {
                    'start': new Date(2018, 0, 5, startHour, startMins, 0, 0),
                    'end': new Date(2018, 0, 5, endHour, endMins, 0, 0),
                }));
            }
        }

        return events;
    }

    removePlannedCourse = (event) => {
        this.props.removePlannedCourse(event.code);
    }

    render() {
        let events = this.getEvents();
        return (
            <BigCalendar
                defaultDate={BASE}
                events={events}
                views={['work_week']}
                defaultView={'work_week'}
                toolbar={false}
                formats={formats}
                min={START_HOUR}
                max={END_HOUR}
                step={20}
                timeslots={3}
                eventPropGetter={this.nodeStyler}
                components={{ event: this.Event }}
                onSelectEvent={this.removePlannedCourse}
            />
        )
    }
}

export default Calendar;
