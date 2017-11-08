import React, { Component } from 'react';
import Inspector from '../../components/Inspector';
import './style.css';
import myrmey from '../../assets/myrmey.svg';

class HomePage extends Component {
    render() {
        return (
            <div>
                <nav className="navbar is-light">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <h1>MyrmeyAssist</h1>
                            <img src={myrmey} height={28} width={28} />
                        </div>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <a className="navbar-item" href="https://github.com/farkam135/Myrmey-Assist" target="_blank">
                                <span className="icon" style={{ color: '#333' }}>
                                    <i className="fa fa-lg fa-github"></i>
                                </span>
                            </a>
                            {this.props.user ?
                                <a className="navbar-item">{this.props.user.studentInfo.name}</a>
                                :
                                <a className="navbar-item" onClick={this.props.openLogin}>Login</a>
                            }
                        </div>
                    </div>
                </nav>
                <div className="columns is-gapless">
                    <div className="column">
                        <div className="box is-full-height">
                            Calendar
                            </div>
                    </div>
                    <div className="column is-4">
                        {this.props.popScreen &&
                            <button className="button is-primary is-fullwidth no-radius" onClick={this.props.popScreen}>Back</button>
                        }
                        <Inspector user={this.props.user} screen={this.props.screen} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
