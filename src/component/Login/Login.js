import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AuthenticationService from '../../service/AuthenticationService';
import {withRouter} from 'react-router-dom';

class Login extends Component {

    state = {
      userName: "",
      password: ""
    }

    login() {
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      const body = {
          userName: this.state.userName,
          password: this.state.password
      };
      axios.post("/signin", body, axiosConfig)
          .then((res) => {
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.userName, res.data.accessToken, res.data.tokenType);
            this.props.updateLoggedIn();
            this.props.history.push("/");
          })
          .catch(err => console.log(err));
    }

    userNameChangeHandler(e) {
      this.setState({userName: e.target.value});
    }
    passwordChangeHandler(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
          <div className="col-4 offset-4"> 
            <br></br>
            <h3 className="text-primary">Login</h3>
            <hr></hr>
            <Form className="col-12">
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control required value={this.state.userName} onChange={((e) => this.userNameChangeHandler(e))} type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value={this.state.password} onChange={((e) => this.passwordChangeHandler(e))} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={this.login.bind(this)} variant="primary" type="button">
                    Submit
                </Button>
            </Form>
          </div>
        );
      }
}

export default Login;