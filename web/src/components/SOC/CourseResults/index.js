import React, { Component } from 'react';
import CourseOfferings from '../CourseOfferings';

class CourseResults extends Component {
    render() {
        return (
            <nav className="panel" >
                <p className="panel-heading">{this.props.courseResults.dept} {this.props.courseResults.num} - <b>{this.props.courseResults.name}</b></p>
                <div className="panel-block">
                    <CourseOfferings offerings={this.props.courseResults.offerings} addPlannedCourse={this.props.addPlannedCourse} />
                </div>
            </nav>
        );
    }
}

export default CourseResults;
