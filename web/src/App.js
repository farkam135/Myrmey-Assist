import React, { Component } from 'react';
import LoginPage from './pages/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        loginStatus: {
          loggingIn: false,
          error: undefined
        }
      }
    }
  }

  login = (credentials) => {
    this.setState({
      user: {
        loginStatus: {
          loggingIn: true
        }
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
        if(!res.success){
          this.setState({
            user: {
              loginStatus: {
                loggingIn: false,
                error: res.error
              }
            }
          });
          return;
        }

        console.log(res);
        this.setState({
          user: {
            loginStatus: {
              loggingIn: false
            },
            studentInfo: res.data.studentInfo,
            advice: res.data.advice,
            courses: res.data.courses
          }
        });
      })
      .catch((err) => {
        this.setState({
          user: {
            loginStatus: {
              loggingIn: false,
              error: 'An unexpected error occurred.'
            }
          }
        });
      })
  }

  render() {
    return (
      <div className="App">
        <LoginPage login={this.login} loginStatus={this.state.user.loginStatus} />
      </div>
    );
  }
}

export default App;
