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
        let activeComponent = undefined;
        switch (this.state.activeTab) {
            case "Offerings":
                if (this.props.course.offerings.length === 0) {
                    activeComponent = <p>No Course Offerings :(</p>;
                }
                else {
                    activeComponent = <CourseOfferings offerings={this.props.course.offerings} addPlannedCourse={this.props.addPlannedCourse} />;
                }
                break;

            case "Grade Distributions":
                activeComponent = <GradeDistribution grades={this.props.course.gradeDistributions} />
                break;

            case "Prerequisites":
                activeComponent = <PreReqs prereqs={this.props.course.prereqs} coursesTaken={Object.assign(this.props.user.courses.inProgress, this.props.user.courses.completed)} openCourseDetails={this.props.openCourseDetails} />;
                break;
            
            case "MyrmeyLearn":
                activeComponent = <p><b>Coming Soon...</b> MyrmeyLearn is a machine learning algorithm that uses your grades to match you with similar performing students who have taken this course  
                     in order to predict what grade you will receive. In order to develop this algorithm we need more students logging in so we can collect grades anonymously and make sure
                    MyrmeyLearn is accurate before releasing it. Overtime the more students that use the platform the smarter it will become!</p>;
                break;
            
            case "Comments":
                activeComponent = <p><b>Coming Soon...</b> See what other students who have taken this course say about it, organize it based off which
                                        professor taught it or just view the comments in general.</p>;
                break;
        }

        return (
            <div className="box has-back-button">
                <h3 className="title is-4">{this.props.course.fullName}</h3>
                <h5 className="title is-6">{this.props.course.dept} {this.props.course.num}</h5>
                <p className="is-size-7">{this.props.course.description}</p>
                <div className="tabs">
                    <ul>
                        <li className={this.state.activeTab === 'Offerings' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Offerings</a></li>
                        <li className={this.state.activeTab === 'Grade Distributions' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Grade Distributions</a></li>
                        <li className={this.state.activeTab === 'Prerequisites' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Prerequisites</a></li>
                        <li className={this.state.activeTab === 'MyrmeyLearn' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>MyrmeyLearn</a></li>
                        <li className={this.state.activeTab === 'Comments' ? "is-active" : "is-inactive"}><a onClick={this.changeActiveTab}>Comments</a></li>
                    </ul>
                </div>
                {activeComponent}
            </div>
        )
    }
}

export default CourseDetails;
