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
import Contests from "./component/Contests/Contests"
import Contest from "./component/Contest/Contest"
import Home from "./component/Home/Home"
import NotFound from "./utils/NotFound/NotFound"
import Footer from "./component/Footer/Footer"
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "./service/AuthenticationService"
import ProblemContainer from "./component/ProblemContainer/ProblemContainer";

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
        <div className="d-flex flex-column justify-content-between min-vh-100">
          <div>
            <NavBar updateLoggedIn = {() => this.updateLoggedIn()} isLoggedInUser={this.state.isLoggedInUser}/>
            <Switch location = { this.props.location }>
              <Route exact path="/" component={Home} />
              <Route exact path="/problems" component={Problems}/>
              <Route exact path="/contests" component={Contests}/>
              <Route exact path="/problems/:problemId" component={ProblemContainer} />
              <Route exact path="/contests/:contestId" component={Contest} />
              <Route path="/contests/:contestId/problems/:problemId" component={ProblemContainer} />
              <Route path="/login"
                render={(props) => (
                <Login {...props} updateLoggedIn = {() => this.updateLoggedIn()} />
              )} />
              <Route path="/signup" component={Signup}/>
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
