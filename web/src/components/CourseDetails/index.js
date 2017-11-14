import React, { Component } from 'react';
import PreReqs from '../PreReqs';
import GradeDistribution from '../GradeDistribution';
import CourseOfferings from '../SOC/CourseOfferings';
import './style.css';

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Offerings'
        }
    }

    changeActiveTab = (e) => {
        this.setState({ activeTab: e.target.text });
    }

    render() {
        let courseName = `${this.props.course.dept} ${this.props.course.num}`;
        let activeTitle = <h5 className="title is-6">{courseName}</h5>;
        let activeTab = undefined;

        let coursesTaken = {};
        if (this.props.user) {
            coursesTaken = Object.assign(this.props.user.courses.inProgress, this.props.user.courses.completed);
            if (!coursesTaken[courseName]) {
                activeTitle = <h5 className="title is-6">{courseName} <a className="is-size-7" onClick={() => { this.props.addCompletedCourse(courseName) }}>Mark as complete</a></h5>;
            }
        }

        switch (this.state.activeTab) {
            case "Offerings":
                if (this.props.course.offerings.length === 0) {
                    activeTab = <p>No Course Offerings :(</p>;
                }
                else {
                    activeTab = <CourseOfferings offerings={this.props.course.offerings} courseName={courseName} addWatchlist={this.props.addWatchlist} addPlannedCourse={this.props.addPlannedCourse} />;
                }
                break;

            case "Grades":
                activeTab = this.props.user ? [<GradeDistribution key={1} grades={this.props.course.gradeDistributions} />,
                <p key={2}><b>Coming Soon...</b> MyrmeyLearn is a machine learning algorithm that uses your grades to match you with similar performing students who have taken this course
                    in order to predict what grade you will receive. In order to develop this algorithm we need more students logging in so we can collect grades anonymously and make sure
                MyrmeyLearn is accurate before releasing it. Overtime the more students that use the platform the smarter it will become!</p>]
                    : <p>You must be logged in to view.</p>
                break;

            case "Prerequisites":
                activeTab = <PreReqs prereqs={this.props.course.prereqs} coursesTaken={coursesTaken} openCourseDetails={this.props.openCourseDetails} />;
                break;

            case "Comments":
                activeTab = <p><b>Coming Soon...</b> See what other students who have taken this course say about it, organize it based off which
                                        professor taught it or just view the comments in general.</p>;
                break;
        }

        return (
            <div className="box has-back-button">
                <h3 className="title is-4">{this.props.course.fullName}</h3>
                {activeTitle}
                <p className="is-size-7">{this.props.course.description}</p>
                <div className="tabs">
                    <ul>
                        <li className={this.state.activeTab === 'Offerings' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Offerings</a></li>
                        <li className={this.state.activeTab === 'Grades' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Grades</a></li>
                        <li className={this.state.activeTab === 'Prerequisites' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Prerequisites</a></li>
                        <li className={this.state.activeTab === 'Comments' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Comments</a></li>
                    </ul>
                </div>
                {activeTab}
            </div>
        )
    }
}

export default CourseDetails;
