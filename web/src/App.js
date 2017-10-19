import React, { Component } from 'react';

import LoginPage from './pages/login';
import HomePage from './pages/home';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: {
        loggingIn: false,
        error: undefined
      }
    }
  }

  login = (credentials) => {
    this.setState({
      loginStatus: {
        loggingIn: true
      }
    });

    console.log(credentials);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          this.setState({
            loginStatus: {
              loggingIn: false,
              error: res.error
            }
          });
          return;
        }

        console.log(res);
        this.setState({
          loginStatus: null,
          user: {
            myrmeyid: res.data.myrmeyid,
            studentInfo: res.data.studentInfo,
            advice: res.data.advice,
            courses: res.data.courses
          }
        });
      })
      .catch((err) => {
        this.setState({
          loginStatus: {
            loggingIn: false,
            error: 'An unexpected error occurred.'
          }
        });
      })
  }

  render() {
    return (
      <div className="App">
        {!this.state.user ?
          <LoginPage login={this.login} loginStatus={this.state.loginStatus} />
          :
          <HomePage user={this.state.user} />
        }
      </div>
    );
  }
}

export default App;
