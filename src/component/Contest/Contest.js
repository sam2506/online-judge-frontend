import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { USER_NAME_SESSION_ATTRIBUTE_NAME, USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import { Jumbotron } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import CountDownTimer from "../../utils/CountDownTimer/CountDownTimer"
import NotFound from "../../utils/NotFound/NotFound";
import { JUDGE_DOMAIN } from "../../config";
import Loading from "../Loading/Loading";

class Contest extends Component {

    state = {
        contest: null,
        currentRank: "NA",
        loading: true
    }
    
    fetchContest() {
        const contestId = this.props.match.params.contestId;
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };

        axios.get(JUDGE_DOMAIN + "/contests/" + contestId, axiosConfig)
            .then(res => {
                const contest = res.data;
                console.log(contest);
                this.setState({contest: contest, loading: false});
            }).catch((err) => {
                console.log(err);
                const statusCode = err.response.data.status;
                this.setState({loading: false})
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
                    <div className="col-2">
                        <a href={ "/contests/" + this.props.match.params.contestId + "/problems/" + problem.problemId}><Button variant="outline-primary">Solve Problem</Button></a>
                    </div>
                </div>
            </Jumbotron>
        )
    }

    getCurrentRank() {
        const contestId = this.props.match.params.contestId;
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        const loggedInUserName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };
        const params = {
            userName: loggedInUserName
        }
        axios.get(JUDGE_DOMAIN + "/contests/" + contestId + "/leaderboard", {params: params}, axiosConfig)
            .then(res => {
                console.log(res.data)
                this.setState({currentRank: res.data + 1});
            }).catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.fetchContest();
        setInterval(this.getCurrentRank(), 10000)
    }

    render() {
        return (
            <div>
                { ! this.state.loading ?
                (<div className="col-10 offset-1">
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
                                <h4>Current Rank: {this.state.currentRank}</h4>
                                <br></br>
                                <h5>Contest ends in: </h5>
                                <CountDownTimer time={this.state.contest.endTime}/>
                            </div>
                        </div>
                    </div>) : <NotFound/>}
                </div>) : <Loading />
                }
            </div>
        );
    }
}

export default Contest;