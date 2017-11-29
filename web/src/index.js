import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store.js';
import registerServiceWorker from './registerServiceWorker';
import './theme.css';

ReactDOM.render(
  <Provider store = { store }>
  	<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
