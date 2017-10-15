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

    login = (e, ucinetid_auth) => {
        this.props.login({
            ucinetid_auth,
            ucinetid: this.state.ucinetid,
            password: this.state.password
        })
    }

    render() {
        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-4 is-offset-4">
                                <div className="box">
                                    {!global.chrome.app.isInstalled &&
                                    <div className="field" id="myrmey_login">
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
                                    </div>}
                                    <div className="control">
                                        { true ?//global.chrome.app.isInstalled ?
                                        [<input type="hidden" id="ucinetid_auth" onClick={(e) => {this.login(e,e.target.value)}} />,
                                        <a id="webauth_login" className={'button is-primary is-outlined is-medium is-fullwidth ' + (this.props.loginStatus.loggingIn && 'is-loading')} href="https://login.uci.edu/ucinetid/webauth?return_url=http://localhost:3000/webauth">Login Through WebAuth </a>]
                                        :
                                        <button className={'button is-primary is-outlined is-medium is-fullwidth ' + (this.props.loginStatus.loggingIn && 'is-loading')} onClick={() => {global.chrome.webstore.install()}}>Enable WebAuth Login</button>
                                        }
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
