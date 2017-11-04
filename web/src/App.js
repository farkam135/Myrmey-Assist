import React, { Component } from 'react';
import update from 'immutability-helper';

import LoginPage from './pages/login';
import HomePage from './pages/home';
import Search from './components/SOC/Search';
import SearchResults from './components/SOC/SearchResults';
import CourseDetails from './components/CourseDetails';


const SCREENS = {
  SOC: Search,
  SEARCH_RESULTS: SearchResults,
  COURSE_DETAILS: CourseDetails
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: {
        loggingIn: false,
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
        openCourseDetails: this.openCourseDetails
      },
      COURSE_DETAILS: {
        addPlannedCourse: this.addPlannedCourse,
        openCourseDetails: this.openCourseDetails
      },
      history: [],
      currScreen: "SOC"
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

  pushScreen = (screen, data, historyProps) => {
    let props = update(this.state[screen], { $merge: data });

    //If we don't provide any props to save to the history, just use the current props of the screen.
    if(!historyProps){
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
    let socSearching = update(this.state.SOC, { $merge: { isSearching: true } });
    let socIdle = update(this.state.SOC, { $merge: { isSearching: false } });
    this.setState({
      SOC: socSearching
    });

    //Add actual search
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
            SOC: socIdle
          });
          return;
        }

        this.pushScreen('SEARCH_RESULTS', { searchResults: res.data }, socIdle);
      })
      .catch((err) => {
        this.setState({
          SOC: socIdle
        });
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

  addPlannedCourse = (course) => {
    //TODO
    console.log(course);
  }

  render() {
    let screen = {
      component: SCREENS[this.state.currScreen],
      data: this.state[this.state.currScreen]
    }

    return (
      <div className="App">
        {!this.state.user ?
          <LoginPage login={this.login} loginStatus={this.state.loginStatus} />
          :
          <HomePage user={this.state.user} screen={screen} popScreen={this.state.history.length > 0 ? this.popScreen : undefined} />
        }
      </div>
    );
  }
}

export default App;
