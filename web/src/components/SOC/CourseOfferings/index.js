import React, { Component } from 'react';
import './style.css';

class CourseOfferings extends Component {
    render() {
        let offeringRows = this.props.offerings.map((offering, i) => {
            //Create instructor td by cheking if there is ratemyprofessor data
            let instructorTD = offering.Instructor.map((instructor, i) => {
                if (instructor.rmp) {
                    return <a key={i} target="_blank" href={`http://www.ratemyprofessors.com/ShowRatings.jsp?tid=${instructor.rmp.id}`}>{instructor.name} [{Number(instructor.rmp.rating).toFixed(1)}]<br /></a>
                }
                else {
                    return `${instructor.name}\n`
                }
            });

            let statusTD = <td><b>{offering.Status}</b></td>;
            if (offering.Status === 'OPEN') {
                statusTD = <td className="has-text-success"><b>{offering.Status}</b></td>;
            }
            else if (offering.Status === 'Waitl') {
                statusTD = <td className="has-text-danger"><b>{offering.Status}</b></td>;
            }
            else if (offering.Status === 'NewOnly') {
                statusTD = <td className="has-text-primary"><b>{offering.Status}</b></td>;
            }
            else if (offering.Status === 'FULL') {
                statusTD = <td><a onClick={() => { this.props.addWatchlist(offering.Code) }}><b>{offering.Status}</b></a></td>;
            }

            return <tr key={i}>
                <td className="clickable" onClick={() => { this.props.addPlannedCourse(offering) }}><a>{offering.Code}</a></td>
                <td>{offering.Type}</td>
                <td>{offering.Units}</td>
                <td>{instructorTD}</td>
                <td>{offering.Time}</td>
                <td>{offering.Max}</td>
                <td>{offering.Enr}</td>
                <td>{offering.WL}</td>
                {statusTD}
            </tr>
        })
        return (
            <table className="table is-striped is-bordered is-size-7 is-fullwidth">
                <thead>
                    <tr className="table-header">
                        <th>Code</th>
                        <th>Type</th>
                        <th>Units</th>
                        <th>Instructor</th>
                        <th>Time</th>
                        <th>Max</th>
                        <th>Enr</th>
                        <th>WL</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {offeringRows}
                </tbody>
            </table>
        )
    }
}

export default CourseOfferings;
