import React, { Component } from 'react';

class LoginPage extends Component {
    render() {
        return (
            <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-4 is-offset-4">
                                <div className="box">
                                    <div className="field">
                                        <div className="control">
                                            <label className="label">UCINETID</label>
                                            <input className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <label className="label">PASSWORD</label>
                                            <input className="input" type="password" />
                                        </div>
                                    </div>
                                    <div className="control">
                                        <button className="button is-primary is-large is-fullwidth">Login</button>
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
