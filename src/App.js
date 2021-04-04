import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./component/Login/Login";
import NavBar from "./component/NavBar/NavBar";
import Signup from "./component/Signup/Signup";
import Problems from "./component/Problems/Problems"
import Problem from "./component/Problem/Problem"
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "./service/AuthenticationService"

class App extends Component {
  state = {
    isLoggedInUser: false
  }
  updateLoggedIn() {
    var temp = this.state.isLoggedInUser;
    this.setState({isLoggedInUser: !temp});
  }

  componentDidMount() {
    this.setState({isLoggedInUser: sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME)});
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar updateLoggedIn = {() => this.updateLoggedIn()} isLoggedInUser={this.state.isLoggedInUser}/>
          <Switch location = { this.props.location }>
            <Route exact path="/problems" component={Problems}/>
            <Route path="/problems/:id" component = {Problem} />
            <Route path="/login"
              render={(props) => (
              <Login {...props} updateLoggedIn = {() => this.updateLoggedIn()} />
            )} />
            <Route path="/signup" component={Signup}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
