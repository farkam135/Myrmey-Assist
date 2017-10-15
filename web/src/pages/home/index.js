import React, { Component } from 'react';
class HomePage extends Component {
    render() {
        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                   <div className="container">
                    Welcome {this.props.user.studentInfo.name}!
                   </div> 
                </div>
                <div className="hero-foot">
                </div>
            </section>
        );
    }
}

export default HomePage;
