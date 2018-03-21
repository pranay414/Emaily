import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
   this.props.fetchUser();
  }

  render() {
  return(
    <div className="container">
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact={true} path="/" component={Landing}/>
          <Route exact={true} path="/surveys" component={Dashboard}/>
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
 }
}

export default connect(null, actions)(App);