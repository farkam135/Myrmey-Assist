import React, { Component } from 'react';

class GradeDistribution extends Component {
    render() {
        let tbody = this.props.grades.map((offering) => {
            let total = offering.F + offering.D + offering.C + offering.B + offering.A;
            return <tr>
                {offering.instructor.id !== undefined ?
                    <td><a target="_blank" href={`http://www.ratemyprofessors.com/ShowRatings.jsp?tid=${offering.instructor.id}`}>{offering.instructor.name}</a></td>
                    :
                    <td>{offering.instructor.name}</td>
                }
                <td>{Math.round((offering.A / total) * 100)}%</td>
                <td>{Math.round((offering.B / total) * 100)}%</td>
                <td>{Math.round((offering.C / total) * 100)}%</td>
                <td>{Math.round((offering.D / total) * 100)}%</td>
                <td>{Math.round((offering.F / total) * 100)}%</td>
                <td>{total}</td>
            </tr>
        });

        return (
            <table className="table is-bordered is-striped is-hoverable">
                <thead>
                    <th>Instructor</th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>F</th>
                    <th># Grades</th>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        )
    }
}

export default GradeDistribution;
