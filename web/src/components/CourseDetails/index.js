import React, { Component } from 'react';
import PreReqs from '../PreReqs';
import GradeDistribution from '../GradeDistribution';
import CourseOfferings from '../SOC/CourseOfferings';

class CourseDetails extends Component {
    render() {
        return (
            <div>
                <h3 className="title is-3">{this.props.course.fullName}</h3>
                <h5 className="title is-5">{this.props.course.dept} {this.props.course.num}</h5>
                <p>{this.props.course.description}</p>
                <div className="is-divider"></div>
                <PreReqs prereqs={this.props.course.prereqs} coursesTaken={Object.assign(this.props.user.courses.inProgress, this.props.user.courses.completed)} />
                <div className="is-divider"></div>
                <GradeDistribution grades={this.props.course.gradeDistributions} />
                <div className="is-divider"></div>
                {this.props.course.offerings.length === 0 ?
                    <p>No Course Offerings :(</p>
                    :
                    <CourseOfferings offerings={this.props.course.offerings} addPlannedCourse={this.props.addPlannedCourse} />
                }
            </div>
        )
    }
}

export default CourseDetails;
