import React, { Component } from 'react';

class PreReqsSection extends Component {
    render() {
        console.log(this.props.section);
        let coursesHtml = this.props.section.map((course) => {
            return <tr>
                <td>{course.name}</td>
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