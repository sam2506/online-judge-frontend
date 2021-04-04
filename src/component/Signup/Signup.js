import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import {withRouter} from 'react-router-dom';

class Signup extends Component {

    state = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        isUserNameValidated: true,
        isEmailValidated: true,
        isSignedUp: false
    }

    signUp(event) {
        event.preventDefault();
        this.setState({
            isUserNameValidated: true,
            isEmailValidated: true 
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            emailId: this.state.email,
            password: this.state.password
        };
        axios.post("http://localhost:8080/signup", body, axiosConfig)
            .then((res) => {
                this.setState({
                    firstName: "",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                    isUserNameValidated: true,
                    isEmailValidated: true,
                    isSignedUp: true 
                })
            })
            .catch((err) => {
                if(err.response.data === "Username: " + this.state.userName + " already exist") {
                    this.setState({isUserNameValidated: false})
                }
                if(err.response.data === "EmailId: " + this.state.email + " already exist") {
                    this.setState({isEmailValidated: false})
                }
            });
    }

    firstNameChangeHandler(e) {
        this.setState({firstName: e.target.value});
    }

    lastNameChangeHandler(e) {
        this.setState({lastName: e.target.value});
    }
    userNameChangeHandler(e) {
        this.setState({userName: e.target.value});
    }
    emailChangeHandler(e) {
        this.setState({email: e.target.value});
    }
    passwordChangeHandler(e) {
        this.setState({password: e.target.value});
    }

    closeModal() {
        this.setState({isSignedUp: false});
    }

    openLoginPage() {
        this.props.history.push("/login");
    }

    render() {
        var isUserNameValidated = this.state.isUserNameValidated;
        var isEmailValidated = this.state.isEmailValidated;
        var isSignedUp = this.state.isSignedUp;
        return (
          <div className="col-4 offset-4"> 
            <br></br>
            <h3 className="text-primary">Sign Up</h3>
            <hr></hr>
            <Form onSubmit={this.signUp.bind(this)} className="col-12">
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required value={this.state.firstName} onChange={((e) => this.firstNameChangeHandler(e))} type="text" placeholder="Enter First Name" />
                    <Form.Control.Feedback type="invalid">
                        Please enter your first name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required value={this.state.lastName} onChange={((e) => this.lastNameChangeHandler(e))} type="text" placeholder="Enter Last Name" />
                    <Form.Control.Feedback type="invalid">
                        Please enter your last name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required value={this.state.email} onChange={((e) => this.emailChangeHandler(e))} type="email" placeholder="Enter Email Address" />
                </Form.Group>
                { !isEmailValidated ? (<p className="text-danger">* This Email Address already exists.</p>) : null }

                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control required value={this.state.userName} onChange={((e) => this.userNameChangeHandler(e))} type="text" placeholder="Enter Username" />
                </Form.Group>
                { !isUserNameValidated ? (<p className="text-danger">* This Username already exists.</p>) : null }   

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value={this.state.password} onChange={((e) => this.passwordChangeHandler(e))} type="password" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Modal show={isSignedUp} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>You signed up successfully.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.openLoginPage.bind(this)} variant="primary">Login</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
          </div>
        );
      }
}

export default Signup;