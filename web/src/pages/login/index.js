import React, { Component } from 'react';

class LoginPage extends Component {
    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="box">
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder="ucinetid" />
                                    </div>
                                    <div className="control">
                                        <input className="input" type="password" placeholder="password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginPage;
