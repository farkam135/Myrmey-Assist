import React, { Component } from 'react';
import update from 'immutability-helper';

import LoginPage from './pages/login';
import HomePage from './pages/home';
import Search from './components/SOC/Search';

const screens = {
  soc: Search
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: {
        loggingIn: false,
        error: undefined
      },
      soc: {
        searchParams: {
          Breadth: "ANY",
          Dept: "ALL",
          CourseNum: '',
          Division: 'ANY',
          CourseCodes: '',
          InstrName: '',
          CourseTitle: '',
          ClassType: 'ALL',
          Units: '',
          Days: '',
          StartTime: '',
          EndTime: '',
          FullCourses: "ANY",
          Bldg: '',
          Room: ''
        },
        onSearch: this.searchSOC,
        onChange: this.changeSOCParams,
        isSearching: false
      },
      history: [],
      currScreen: "soc"
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
          user: res.data
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

  pushScreen = (screen) => {
    if (this.state.currScreen !== null) {
      this.setState({
        history: this.state.history.concat([this.state.currScreen]),
        currScreen: screen
      });
      return;
    }

    this.setState({
      currScreen: screen
    });
  }

  popScreen = () => {
    this.setState({
      currScreen: this.state.history[this.state.screens.length - 1],
      history: this.state.history.slice(0, -1)
    })
  }

  changeSOCParams = (e) => {
    let newSearchParams = update(this.state.soc.searchParams,{$merge: {[e.target.name]: e.target.value}});
    let newSoc = update(this.state.soc, {$merge: {searchParams: newSearchParams}});

    this.setState({
      soc: newSoc
    })
  }

  searchSOC = () => {
    let newSoc = update(this.state.soc, {$merge: {isSearching: true}});
    this.setState({
      soc: newSoc
    });

    //Add actual search

  }

  render() {
    let screen = {
      component: screens[this.state.currScreen],
      data: this.state[this.state.currScreen]
    }

    return (
      <div className="App">
        {!this.state.user ?
          <LoginPage login={this.login} loginStatus={this.state.loginStatus} />
          :
          <HomePage screen={screen} />
        }
      </div>
    );
  }
}

export default App;
