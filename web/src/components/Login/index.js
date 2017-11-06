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

    onTextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    login = (e) => {
        this.props.login({
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
            <div className="box has-back-button">
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
                            <button className={'button is-info is-large is-fullwidth ' + (this.props.loggingIn && 'is-loading')} onClick={this.login}>Login</button>
                        </div>
                    </div>
                    <div className="field">
                        <a id="webauth_login" className={'button is-primary is-outlined is-medium is-fullwidth ' + (this.props.loggingIn && 'is-loading')} onClick={() => { this.showWebAuthModal(true) }}>Login Through WebAuth </a>
                    </div>
                </div>
                {this.props.error && <MessageBox type="is-danger" message={this.props.error} />}
                <div className="content">
                    <p><b>NOTE:</b> By logging into MyrmeyAssist you acknowledge your grades will be anonymously stored in order to improve MyrmeyLearn and
                        grade distributions in courses. Do <b>NOT</b> login if you do not want your grades stored. For more information on how
                        MyrmeyAssist keeps your identity secure and what happens once you login click <a href="https://github.com/farkam135/Myrmey-Assist/wiki/Student-Privacy" target="_blank">HERE.</a></p>
                </div>
                {this.state.showWebAuthModal && this.loginThroughWebAuthModal()}
            </div>
        );
    }
}

export default LoginPage;
