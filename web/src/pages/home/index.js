import React, { Component } from 'react';
import Inspector from '../../components/Inspector';
class HomePage extends Component {
    render() {
        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="columns">
                        <div className="column">
                            <div className="button is-fullwidth">
                                ayy
                            </div>
                        </div>
                        <div className="column is-narrow">
                            <Inspector screen={this.props.screen} />
                        </div>
                    </div>
                </div>
                <div className="hero-foot">
                </div>
            </section>
        );
    }
}

export default HomePage;
