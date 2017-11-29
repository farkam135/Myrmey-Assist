import { createStore } from 'redux';
import reducer from './reducers/index';
var store = createStore(reducer);

export default store;