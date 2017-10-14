import React, { Component } from 'react';
import MessageBox from '../../components/MessageBox';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ucinetid: '',
            password: ''
        }
    }

    onTextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    login = () => {
        this.props.login(this.state.ucinetid, this.state.password);
    }

    render() {
        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-4 is-offset-4">
                                <div className="box">
                                    <div className="field">
                                        <div className="control">
                                            <label className="label">UCINETID</label>
                                            <input className="input" type="text" id="ucinetid" value={this.state.ucinetid} onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <label className="label">PASSWORD</label>
                                            <input className="input" type="password" id="password" value={this.state.password} onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="field">
                                    <div className="control">
                                        <button className={'button is-info is-large is-fullwidth ' + (this.props.loginStatus.loggingIn && 'is-loading')} onClick={this.login}>Login</button>
                                    </div>
                                    </div>
                                    <div className="control">
                                        <a id="webauth_login" className={'button is-primary is-outlined is-medium is-fullwidth ' + (this.props.loginStatus.loggingIn && 'is-loading')} href="http://localhost:3000">Login Through WebAuth </a>
                                    </div>
                                </div>
                                {this.props.loginStatus.error !== undefined && <MessageBox type="is-danger" message={this.props.loginStatus.error} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-foot">
                    <div className="container">
                        <p>Disclaimer: Logging into Project Myrmey results in your ucinetid and password being stored in plain text on an insecure server in Malaysia. Use at your own risk.</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginPage;
