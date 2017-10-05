import React, { Component } from 'react';
//import logo from './logo.svg';
import LoginPage from './pages/login';
import './App.css';
import 'bulma/css/bulma.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
