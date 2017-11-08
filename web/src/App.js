import React, { Component } from 'react';
import update from 'immutability-helper';
import NotificationSystem from 'react-notification-system';

import HomePage from './pages/home';
import Search from './components/SOC/Search';
import SearchResults from './components/SOC/SearchResults';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';


const SCREENS = {
  SOC: Search,
  SEARCH_RESULTS: SearchResults,
  COURSE_DETAILS: CourseDetails,
  LOGIN: Login
}

class App extends Component {
  _notificationSystem = null;

  constructor(props) {
    super(props);
    this.state = {
      LOGIN: {
        loggingIn: false,
        login: this.login,
        error: undefined
      },
      SOC: {
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
      SEARCH_RESULTS: {
        addPlannedCourse: this.addPlannedCourse,
        addWatchlist: this.addWatchlist,
        openCourseDetails: this.openCourseDetails
      },
      COURSE_DETAILS: {
        addPlannedCourse: this.addPlannedCourse,
        addWatchlist: this.addWatchlist,
        addCompletedCourse: this.addCompletedCourse,
        openCourseDetails: this.openCourseDetails
      },
      schedule: {},
      history: [],
      currScreen: "SOC"
    }

  }

  componentDidMount = () => {
    this._notificationSystem = this.refs.notificationSystem;
    if (global.location.search.includes('?ucinetid_auth=')) {
      this.login({ ucinetid_auth: global.location.search.replace('?ucinetid_auth=', '') });
    }
  }

  openLogin = () => {
    this.pushScreen('LOGIN', { loggingIn: false, error: undefined });
  }

  login = (credentials) => {
    if (this.state.currScreen !== 'LOGIN') {
      this.pushScreen('LOGIN', { loggingIn: true });
    }
    else {
      this.setState({
        LOGIN: {
          loggingIn: true,
          login: this.login
        }
      })
    }

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
            LOGIN: {
              loggingIn: false,
              login: this.login,
              error: res.error
            }
          });
          return;
        }

        this.setState({
          user: res.data,
          currScreen: "SOC",
          history: []
        });
      })
      .catch((err) => {
        this.setState({
          LOGIN: {
            loggingIn: false,
            login: this.login,
            error: 'An unexpected error occurred.'
          }
        });
      })
  }

  pushScreen = (screen, data, historyProps) => {
    let props = update(this.state[screen], { $merge: data });

    //If we don't provide any props to save to the history, just use the current props of the screen.
    if (!historyProps) {
      historyProps = this.state[this.state.currScreen];
    }

    this.setState({
      history: this.state.history.concat([{ screen: this.state.currScreen, props: historyProps }]),
      currScreen: screen,
      [screen]: props
    });
  }

  popScreen = () => {
    let prevScreen = this.state.history[this.state.history.length - 1];
    this.setState({
      currScreen: prevScreen.screen,
      [prevScreen.screen]: prevScreen.props,
      history: this.state.history.slice(0, -1)
    })
  }

  changeSOCParams = (e) => {
    let newSearchParams = update(this.state.SOC.searchParams, { $merge: { [e.target.name]: e.target.value } });
    let newSoc = update(this.state.SOC, { $merge: { searchParams: newSearchParams } });

    this.setState({
      SOC: newSoc
    })
  }

  searchSOC = () => {
    let socSearching = update(this.state.SOC, { $merge: { isSearching: true, error: undefined } });
    let socIdle = update(this.state.SOC, { $merge: { isSearching: false, error: undefined } });
    this.setState({
      SOC: socSearching
    });

    fetch('/api/searchSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.SOC.searchParams)
    }).then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          this.setState({
            SOC: update(socIdle, { $merge: { error: res.error } })
          });
          return;
        }

        this.pushScreen('SEARCH_RESULTS', { searchResults: res.data }, socIdle);
      })
      .catch((err) => {
        this.setState({
          SOC: update(socIdle, { $merge: { error: 'An Unexpected Error Occurred.' } })
        });
      })
  }

  addCompletedCourse = (courseName) => {
    let updatedCompletedCourses = update(this.state.user.courses.completed, { $merge: { [courseName]: 'Manual' } });
    let updatedCourses = update(this.state.user.courses, { $merge: { completed: updatedCompletedCourses } });
    let updatedUser = update(this.state.user, { $merge: { courses: updatedCourses } });

    fetch('/api/addCompletedCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ myrmeyid: this.state.user.myrmeyid, courseName })
    });

    this.setState({
      user: updatedUser
    })
  }

  addWatchlist = (code) => {
    if (!this.state.user) {
      this._notificationSystem.addNotification({
        title: "Error",
        message: "Must be logged in to add a course to your watchlist",
        level: "error"
      });
      return;
    }

    fetch('/api/addWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ myrmeyid: this.state.user.myrmeyid, email: this.state.user.studentInfo.email.toLowerCase(), code })
    }).then(res => res.json())
      .then((response) => {
        if (response.success) {
          this._notificationSystem.addNotification({
            title: "Course Added",
            message: `${code} has been added to your watchlist. You will be emailed at ${this.state.user.studentInfo.email.toLowerCase()} when it is no longer FULL.`,
            level: "success"
          });
        }
        else {
          this._notificationSystem.addNotification({
            title: "Error",
            message: response.error,
            level: "error"
          });
        }
      })
  }

  openCourseDetails = (courseName) => {
    courseName = encodeURIComponent(courseName);

    let courseDetailsLoading = update(this.state.COURSE_DETAILS, { $merge: { isLoading: true } });
    let courseDetailsIdle = update(this.state.COURSE_DETAILS, { $merge: { isLoading: false } });

    this.setState({
      COURSE_DETAILS: courseDetailsLoading
    });

    fetch(`/api/getCourseDetails?course=${courseName}`, {
      method: 'GET'
    }).then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          this.setState({
            COURSE_DETAILS: courseDetailsIdle
          });
          return;
        }

        this.pushScreen('COURSE_DETAILS', { course: res.data })
      })
  }

  addPlannedCourse = (courseName, offering) => {
    let plannedOffering = {
      name: courseName,
      code: offering.Code,
      type: offering.Type,
      time: offering.Time
    };

    this.setState({
      schedule: update(this.state.schedule, { $merge: { [offering.Code]: plannedOffering } })
    })

    //TODO: Send to server
  }

  removePlannedCourse = (code) => {
    this.setState({
      schedule: update(this.state.schedule, { $unset: [code] })
    })
  }

  render() {
    let screen = {
      component: SCREENS[this.state.currScreen],
      data: this.state[this.state.currScreen]
    }

    return (
      <div className="App">
        <HomePage user={this.state.user} schedule={this.state.schedule} removePlannedCourse={this.removePlannedCourse} screen={screen} openLogin={this.openLogin} popScreen={this.state.history.length > 0 ? this.popScreen : undefined} />
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default App;
