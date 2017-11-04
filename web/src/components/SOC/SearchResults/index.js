import React, { Component } from 'react';
import CourseResults from '../CourseResults';

class SearchResults extends Component {
    render() {
        let courseResults = this.props.searchResults.map((courseResult, i) => {
            return <CourseResults key={i} courseResults={courseResult} addPlannedCourse={this.props.addPlannedCourse} openCourseDetails={this.props.openCourseDetails} />
        });

        return (
            <div className="box no-padding">
                {courseResults}
            </div>
        )
    }
}

export default SearchResults;
