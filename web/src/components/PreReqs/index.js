import React, { Component } from 'react';
import PreReqsSection from './PreReqsSection';
class PreReqs extends Component {
    getPrereqsComplete(prereqs, coursesTaken) {
        let prereqsComplete = {
            satisfied: true,
            sections: []
        };

        //If there are prereqs
        if (prereqs) {
            prereqs.forEach((section) => {
                let sectionSatified = false;
                let sectionCourses = [];

                section.forEach((sectionCourse) => {
                    let courseSatisfied = coursesTaken.hasOwnProperty(sectionCourse);
                    if (courseSatisfied) {
                        sectionSatified = true;
                    }

                    sectionCourses.push({
                        name: sectionCourse,
                        satisfied: courseSatisfied
                    });
                })

                prereqsComplete.sections.push(sectionCourses);
                if (!sectionSatified) {
                    prereqsComplete.satisfied = false;
                }
            })
        }
        return prereqsComplete;
    }

    render() {
        let prereqs = this.getPrereqsComplete(this.props.prereqs, this.props.coursesTaken);

        let sections = prereqs.sections.map((section, i) => {
            return <div key={i}>
                {i !== 0 && <div className="is-divider" data-content="AND" />}
                <PreReqsSection section={section} openCourseDetails={this.props.openCourseDetails} />
            </div>
        });

        return (
            <div>
                <div className="content">
                    {prereqs.satisfied ?
                        <h4>You Have <span className="tag is-medium is-success">Satisfied</span> All Required Sections</h4>
                        :
                        <h4>You Have <span className="tag is-medium is-danger">Not Satisfied</span> All Required Sections</h4>
                    }
                </div>
                <div className="is-divider" data-content="PreReqs: At Least 1 course in each of the following sections"/>
                <div>
                    {sections}
                </div>
            </div>
        )
    }
}

export default PreReqs;
