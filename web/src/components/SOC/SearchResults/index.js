import React, { Component } from 'react';
import CourseResults from '../CourseResults';

class SearchResults extends Component {
    render() {
        let courseResults = this.props.searchResults.map((courseResult) => {
            return <CourseResults courseResults={courseResult} addPlannedCourse={this.props.addPlannedCourse} />
        });

        return (
            <div>
                {courseResults}
            </div>
        )
    }
}

export default SearchResults;
