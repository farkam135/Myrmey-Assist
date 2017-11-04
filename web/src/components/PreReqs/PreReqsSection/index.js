import React, { Component } from 'react';

class PreReqsSection extends Component {
    render() {
        let coursesHtml = this.props.section.map((course,i) => {
            return <tr key={i}>
                <td><a onClick={() => {this.props.openCourseDetails(course.name)}}>{course.name}</a></td>
                {course.satisfied ?
                    <td><span className="icon has-text-success"><i className="fa fa-check"></i></span></td>
                    :
                    <td><span className="icon has-text-danger"><i className="fa fa-times"></i></span></td>
                }
            </tr>
        });

        return (
            <table className="table is-bordered">
                <tbody>
                    {coursesHtml}
                </tbody>
            </table>
        )
    }
}

export default PreReqsSection;