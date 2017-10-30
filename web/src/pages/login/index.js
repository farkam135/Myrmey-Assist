import React, { Component } from 'react';
import MessageBox from '../../components/MessageBox';
import './style.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ucinetid: '',
            password: '',
        }
    }

    componentDidMount = () => {
        if (global.location.search.includes('?ucinetid_auth=')) {
            this.login(null, global.location.search.replace('?ucinetid_auth=', ''));
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

    showWebAuthModal = (showWebAuthModal) => {
        this.setState({
            showWebAuthModal
        })
    }

    loginThroughWebAuthModal = () => {
        return (
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login Through WebAuth</p>
                        <button class="delete" aria-label="close" onClick={() => { this.showWebAuthModal(false) }}></button>
                    </header>
                    <section class="modal-card-body">
                        <p style={{ color: "black", marginBottom: 10 }}>Logging into MyrmeyAssist through WebAuth is easy! In order to do it you will have to drag the blue MyrmeyAssist button below
                            into your bookmarks bar and when you are ready, click it. It will redirect you to WebAuth where you will have to login.
                            Once logged in you can press the bookmark again and you will be logged into MyrmeyAssist. This will also work if you are
                            logged into any of UCI's services.</p>
                    </section>
                    <footer class="modal-card-foot">
                        <a className="button is-primary is-large" href="javascript:void%20function(){if(uciRegex=/ucinetid_auth=(%3F!no_key)(.+)/.exec(document.cookie),uciRegex)window.location.href=%22http://localhost:3000/webauth%3Fucinetid_auth=%22+uciRegex[1];else{var%20e=document.createElement(%22meta%22);e.name=%22referrer%22,e.content=%22no-referrer%22,document.getElementsByTagName(%22head%22)[0].appendChild(e),alert(%22Login%20to%20WebAuth.%20Once%20logged%20in,%20press%20the%20MyrmeyAssist%20bookmark%20again!%22),window.location.href=%22https://login.uci.edu/ucinetid/webauth%22}}();">MyrmeyAssist</a>
                    </footer>
                </div>
            </div>
        )
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
                                        <input type="hidden" id="ucinetid_auth" onClick={(e) => { this.login(e, e.target.value) }} />
                                        <a id="webauth_login" className={'button is-primary is-outlined is-medium is-fullwidth ' + (this.props.loginStatus.loggingIn && 'is-loading')} onClick={() => {this.showWebAuthModal(true)}}>Login Through WebAuth </a>
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
                {this.state.showWebAuthModal && this.loginThroughWebAuthModal()}
            </section>
        );
    }
}

export default LoginPage;
