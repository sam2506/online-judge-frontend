import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import { Jumbotron } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import CountDownTimer from "../../utils/CountDownTimer/CountDownTimer"
import NotFound from "../../utils/NotFound/NotFound";

class Contest extends Component {

    state = {
        contest: null
    }
    
    fetchContest() {
        const contestId = this.props.match.params.id;
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };

        axios.get("http://localhost:8080/contests/" + contestId, axiosConfig)
            .then(res => {
                const contest = res.data;
                console.log(contest);
                this.setState({ contest });
            }).catch((err) => {
                console.log(err);
                const statusCode = err.response.data.status;
                if(statusCode == 403) {
                    this.props.history.push({
                        pathname: "/contests",
                        state: {
                            isContestStarted: false
                        }
                    });
                }
            })
    }

    showProblems() {
        var problems = this.state.contest.problemDetailsList;
        if(problems == undefined)
            problems = []
        return problems.map((problem, index) => 
            <Jumbotron className="p-3" style={{backgroundColor: "#DAE4F2"}} key={index}>
                <div className="row">
                    <div className="col-10"><h5 className="mt-1">{index+1}. {problem.problemName}</h5></div>
                    <div className="col-2"><Button variant="outline-primary">Solve Problem</Button></div>
                </div>
            </Jumbotron>
        )
    }

    componentDidMount() {
        this.fetchContest();
    }

    render() {
        return (
            <div className="col-10 offset-1">
                { this.state.contest != null ? 
                (<div className="mt-4">
                    <h2>{this.state.contest.contestName}</h2>
                    <hr></hr>
                    <br></br>
                    <h3>Problems</h3>
                    <br></br>
                    <div className="row">
                        <div className="col-8">
                            {this.showProblems()}
                        </div>
                        <div className="ml-3 col-3">
                            <h4>Current Rank: </h4>
                            <br></br>
                            <h5>Contest ends in: </h5>
                            <CountDownTimer time={this.state.contest.endTime}/>
                        </div>
                    </div>
                </div>) : <NotFound/>}
            </div>
        );
    }
}

export default Contest;