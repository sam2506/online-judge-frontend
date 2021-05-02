import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap'; 
import axios from 'axios';
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import {
    Switch,
    Route,
} from "react-router-dom";
import Problem from "../Problem/Problem";
import NotFound from "../../utils/NotFound/NotFound";

class ProblemContainer extends Component {

    state = {
        problem: null
    }

    fetchProblem() {
        const problemId = this.props.match.params.problemId;
        const contestId = this.props.match.params.contestId;
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };
        var problemFetchUrl;
        if(contestId == undefined) {
            problemFetchUrl = "http://localhost:8080/problems/" + problemId;
        } else {
            problemFetchUrl = "http://localhost:8080/contests/" + contestId + "/problem/" + problemId;
        }
        axios.get(problemFetchUrl, axiosConfig)
            .then(res => {
                const problem = res.data;
                console.log(problem);
                this.setState({ problem });
            }).catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.fetchProblem();
    }

    render() {
        const problem = this.state.problem;
        var problemUrl;
        const problemId = this.props.match.params.problemId;
        const contestId = this.props.match.params.contestId;
        if(contestId == undefined) {
            problemUrl = "/problems/" + problemId;
        } else {
            problemUrl = "/contests/" + contestId + "/problems/" + problemId;
        }
        return (
            <div className="offset-2 col-8 mt-4 shadow p-3 mb-5 bg-white rounded">
                { problem != null ?
                (<div className="col-10 offset-1"> 
                    <br></br>
                    <h1>{problem.problemName}</h1>
                    <h5 className="d-inline"><div>By <h5 className="d-inline text-primary">{problem.setterName} </h5></div></h5>
                    <br></br>
                    <br></br>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="tabs" activeKey={window.location.pathname} className="mr-auto">
                                <Nav.Link className="p-3 mr-4" href={problemUrl}>Problem</Nav.Link>
                                <Nav.Link className="p-3 mx-4" href={problemUrl + "/submissions"}>Submissions</Nav.Link>
                                <Nav.Link className="p-3 mx-4" href={problemUrl + "/editorial"}>Editorial</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <br></br>
                    <Switch location = { this.props.location }>
                        <Route exact path="/problems/:problemId"
                            render={(props) => (
                                <Problem {...props} problem = {this.state.problem}/>
                            )}
                        />
                        <Route exact path="/contests/:contestId/problems/:problemId"
                            render={(props) => (
                                <Problem {...props} problem = {this.state.problem}/>
                            )}
                        />
                    </Switch>
                </div>) : (<NotFound/>)
                }
            </div>
        );
    }
}

export default ProblemContainer;