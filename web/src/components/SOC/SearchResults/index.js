import React, { Component } from 'react';
import './style.css';

class SearchResults extends Component {
    render() {
        return (
            <div>
                <nav className="panel">
                    <p onClick={()=>{console.log('hi')}} className="panel-heading clickable">
                        COMPSCI 121 <b>INFRMTION RETRIEVAL</b>
                    </p>
                    <div className="panel-block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        Test
                                        </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </nav>
            </div>
        )
    }
}

export default SearchResults;
