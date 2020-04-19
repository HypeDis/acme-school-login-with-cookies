import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { checkAuthThunk } from './loginActions';

const { HashRouter, Route, Link } = ReactRouterDOM;
const { createStore, combineReducers, applyMiddleware } = Redux;
const { Provider, connect } = ReactRedux;
const { Component } = React;
import store, { loadData } from './store';
import Nav from './Nav';
import Schools from './Schools';
import School from './School';
import Students from './Students';
import StudentForm from './StudentForm';
import Home from './Home';
import LoginPage from './LoginPage';

class _Routes extends Component {
  componentDidMount() {
    this.props.loadData();
    this.props.checkAuth();
  }
  render() {
    return (
      <HashRouter>
        <Route component={Nav} />
        <div id="content">
          <Route component={StudentForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/schools" component={Schools} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/schools/:id" component={School} />
          <Route exact path="/login" component={LoginPage} />
        </div>
      </HashRouter>
    );
  }
}
const Routes = connect(null, dispatch => {
  return {
    loadData: () => {
      dispatch(loadData());
    },
    checkAuth: () => {
      dispatch(checkAuthThunk());
    },
  };
})(_Routes);

export default () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
