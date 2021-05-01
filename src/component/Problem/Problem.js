import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap'; 
import { NavDropdown } from 'react-bootstrap'; 
import { Button } from 'react-bootstrap'; 
import { Spinner } from 'react-bootstrap';
import AceEditor from 'react-ace'; 
import axios from 'axios';
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import NotFound from "../../utils/NotFound/NotFound";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class Problem extends Component {

    state = {
        languages: ["CPP", "C", "JAVA", "PYTHON"],
        currentLanguage: "Select Language",
        problem: null,
        code: "",
        submitted: false,
        isCompilationSuccessful: false,
        testCasesResponse: [],
        verdict: null,
        noOfTestCases: 0,
        showLanguageSelectAlert: false,
        showContestEndedAlert: false
    }

    selectLanguage(e, language) {
        this.setState({currentLanguage: language});
    }

    showLanguagesInDropdown() {
        var languages = this.state.languages;
        return languages.map((language, index) => 
            <NavDropdown.Item key={index} onClick={((e) => this.selectLanguage(e, language))} eventKey = {index}>{language}</NavDropdown.Item>
        )
    }

    updateCode(updatedCode) {
        this.setState({code: updatedCode});
    }

    scrollToBottom() {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0, 
            behavior: 'smooth'
        });
    }

    submitCode() {
        this.setState({isCompilationSuccessful: false, verdict: null, submitted: false, noOfTestCases: 0, testCasesResponse: []})
        const loggedInUserName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (loggedInUserName == null) {
            this.props.history.push("/login");
        } else {
            const currentLanguage = this.state.currentLanguage
            if(!this.state.languages.includes(currentLanguage)) {
                this.setState({showLanguageSelectAlert: true});
            } else {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME)
                    }
                };
                const body = {
                    submissionId: "sub_id_11",
                    problemId: this.state.problem.problemId,
                    userName: loggedInUserName,
                    code: this.state.code,
                    languageId: currentLanguage
                }
                const problemId = this.props.match.params.problemId;
                const contestId = this.props.match.params.contestId;
                var codeSubmitUrl;
                if(contestId == undefined) {
                    codeSubmitUrl = "http://localhost:8080/problems/" + problemId + "/submit";
                } else {
                    body.contestId = contestId;
                    codeSubmitUrl = "http://localhost:8080/contests/" + contestId + "/problem/" + problemId + "/submit";
                }  
                axios.post(codeSubmitUrl, body, axiosConfig)
                    .then((res) => {
                        console.log(res.data);
                        this.setState({submitted: true})
                        this.setupWebSocket(res.data.submissionId);
                    }).catch((err) => {
                        console.log(err);
                        if(err.response.data.message == "contest has ended") {
                            this.setState({showContestEndedAlert: true})
                        }
                });
            }
        }
    }

    showTestCasesResponse() {
        this.scrollToBottom();
        var testCases = [];
        var testCasesResponse = this.state.testCasesResponse;
        for(var i = 0 ; i < this.state.noOfTestCases ; i++) {
            if(testCasesResponse[i] == undefined) {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                        <i className="mr-1 fa fa-spinner fa-spin"></i>
                        Test Case {i}
                    </div>
                )
            }
            if(testCasesResponse[i] === "WA") {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                       <i title="Wrong Answer" className="text-danger mr-1 fa fa-times" aria-hidden="true"></i>
                        Test Case {i}
                    </div>
                )
            }
            if(testCasesResponse[i] === "AC") {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                        <i title="Correct Answer" className="text-success mr-1 fa fa-check" aria-hidden="true"></i>
                        Test Case {i}
                    </div>
                )
            }
            if(testCasesResponse[i] === "TLE") {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                        <i title="Time Limit Exceeded" className="text-danger mr-1 fa fa-exclamation-circle" aria-hidden="true"></i>
                        Test Case {i}
                    </div>
                )
            }
            if(testCasesResponse[i] === "RE") {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                        <i title="Runtime Error" className="text-danger mr-1 fa fa-exclamation-circle" aria-hidden="true"></i>
                        Test Case {i}
                    </div>
                )
            }
            if(testCasesResponse[i] === "MLE") {
                testCases.push(
                    <div key={i} className="col-3 mb-4">
                        <i title="Memory Limit Exceeded" className="text-danger mr-1 fa fa-exclamation-circle" aria-hidden="true"></i>
                        Test Case {i}
                    </div>
                )
            }
        }
        return testCases;
    }

    showResult() {
        if(this.state.verdict == null) {
            return <span>
                    <Spinner size="sm" className="ml-2 mr-1" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    Evaluating Solution
                </span>
            
        } else {
            return <span className="ml-1">{this.state.verdict}</span>
        }
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

    setupWebSocket(submissionId) {
        const socket = SockJS("http://localhost:8080/chat"); 
        const stompClient = Stomp.over(socket);
        var that = this;
        const userName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        stompClient.connect({}, () => {
            stompClient.subscribe("/user/" + userName + "/queue/" + submissionId + "/testCaseResponses", function(testCaseResponse) {
                testCaseResponse = JSON.parse(testCaseResponse.body);
                var testCaseNo = testCaseResponse["testCaseNo"];
                var verdict = testCaseResponse["verdict"];
                var testCasesResponse = that.state.testCasesResponse;
                testCasesResponse[testCaseNo] = verdict;
                that.setState({testCasesResponse: testCasesResponse});
            });
            stompClient.subscribe("/user/" + userName + "/queue/" + submissionId + "/compilationResponse", function(compilationResponse) {
                compilationResponse = JSON.parse(compilationResponse.body);
                var noOfTestCases = compilationResponse["noOfTestCases"];
                var isCompilationSuccessful = compilationResponse["compilationSuccessful"];
                that.setState({noOfTestCases: noOfTestCases, isCompilationSuccessful: isCompilationSuccessful});
            });
            stompClient.subscribe("/user/" + userName + "/queue/" + submissionId + "/submissionResponse", function(submissionResponse) {
                submissionResponse = JSON.parse(submissionResponse.body);
                var verdict = submissionResponse["verdict"];
                that.setState({verdict: verdict});
            })
        });   
    }

    componentDidMount() {
        this.fetchProblem();
    }

    render() {
        const submitted = this.state.submitted;
        const isCompilationSuccessful = this.state.isCompilationSuccessful;
        const problem = this.state.problem;
        const constraintList = [];
        if(problem != null) {
            const constraints = problem.constraints;
            constraints.map((constraint, index) => 
               constraintList.push(<li key={index}>{constraint}</li>)
            )
        }
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
                    <h5 className="font-weight-bold">Problem Statement</h5>
                    <p>
                        {problem.problemDesc}
                    </p>
                    <h5 className="font-weight-bold">Input Format</h5>
                    <p>
                        The first line contains one integer t (1≤t≤104). Then t test cases follow.

                        Each test case is characterized by a string s, consisting of lowercase Latin letters (1≤|s|≤2⋅105).

                        It is guaranteed that the sum of the lengths of the strings in all test cases does not exceed 2⋅105.
                    </p>
                    <h5 className="font-weight-bold">Output Format</h5>
                    <p>
                        For each test case, output the lexicographically maximum string that can be obtained after applying a certain sequence of operations after which all characters in the string become unique.
                    </p>
                    <h5 className="font-weight-bold">Constraints</h5>
                    <ul>{constraintList}</ul>

                    <p>Time Limit: {problem.timeLimit} <br/>Memory Limit: {problem.memoryLimit}</p>
                    
                    <br></br>

                    { !this.state.languages.includes(this.state.currentLanguage) && this.state.showLanguageSelectAlert ?
                    (<div className="alert alert-dark alert-dismissible fade show" role="alert">
                        <strong>Error!!</strong> Please select any langauge.
                    </div>) : null
                    }

                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <NavDropdown title={this.state.currentLanguage} id="basic-nav-dropdown">
                                {this.showLanguagesInDropdown()}
                            </NavDropdown>
                            </Nav>
                            <Button onClick = {() => this.submitCode()}  variant="outline-primary">Submit</Button>
                        </Navbar.Collapse>
                    </Navbar>
                    <AceEditor className="border" onChange = {(e) => this.updateCode(e)} showPrintMargin={false} width="100%"/>
                    <br></br>

                    { submitted ? 
                    (<div className="p-3 mb-3 bg-light text-dark">
                        RESULT:
                        {this.showResult()}
                    </div>) : null
                    }

                    { isCompilationSuccessful ?
                    (<div className="container p-3 mb-4 bg-light text-dark">
                        <div className="row">
                            { this.showTestCasesResponse() }
                        </div>
                    </div>) : null
                    }
                    { this.state.showContestEndedAlert ?
                    (<div className="alert alert-dark alert-dismissible fade show" role="alert">
                        Contest has ended.
                        {this.scrollToBottom()}
                    </div>) : null
                    }
                </div>) : (<NotFound/>)
                }
            </div>
        );
      }
}

export default Problem;