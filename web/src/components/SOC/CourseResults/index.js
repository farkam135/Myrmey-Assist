import React, { Component } from 'react';
import CourseOfferings from '../CourseOfferings';
import './style.css';

class CourseResults extends Component {
    render() {
        let courseId = `${this.props.courseResults.dept} ${this.props.courseResults.num}`;
        return (
            <nav className="panel is-size-6 no-padding no-margin" >
                <p className="panel-heading clickable no-radius" onClick={() => {this.props.openCourseDetails(courseId)}}>{courseId} - <b>{this.props.courseResults.name}</b><small className="is-size-7">(Click for more info)</small></p>
                <div className="panel-block no-padding">
                    <CourseOfferings offerings={this.props.courseResults.offerings} courseName={courseId} addPlannedCourse={this.props.addPlannedCourse} addWatchlist={this.props.addWatchlist} />
                </div>
            </nav>
        );
    }
}

export default CourseResults;
