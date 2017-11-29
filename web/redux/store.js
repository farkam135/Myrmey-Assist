import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

var middleWare = applyMiddleware;
var store = createStore(reducer, middleWare);

export default store;