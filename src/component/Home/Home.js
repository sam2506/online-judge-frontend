import { Component } from "react";
import { Jumbotron } from "react-bootstrap"
import axios from 'axios';
import CountDown from 'react-countdown'
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"
import CountDownTimer from "../../utils/CountDownTimer/CountDownTimer";

class Home extends Component {
    state = {
        upcomingContests: []
    }

    fetchUpcomingContests() {
        var upcomingContests = [];
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };

        axios.get("/contests/upcomingContest", axiosConfig)
            .then(res => {
                upcomingContests = res.data;
                this.setState({ upcomingContests });
            }).catch((err) => {
                console.log(err);
            })
    }

    showUpcomingContests() {
        var upcomingContests = this.state.upcomingContests;
        return upcomingContests.map((upcomingContest, index) => 
            <div key = {index}>
                <p>
                    <a className="link-primary">{upcomingContest.contestName}</a>
                    {console.log(new Date(upcomingContest.startTime) - new Date())}
                </p>
                <CountDownTimer time={upcomingContest.startTime}/>
            </div>
        )
    }

    componentDidMount() {
        this.fetchUpcomingContests();
    }

    render() {
        return (
            <div>
                <div className="col-8 offset-2 mt-3">
                    <Jumbotron style={{backgroundColor: "#DAE4F2"}}>
                        <h2>
                            BitCode
                        </h2>
                        <p>
                            BitCode is an online judge to test programs in programming contests. <br></br>
                            It can also be used to practice for such contests.<br></br>
                            The system can compile and execute your code, and test your code with pre-constructed data. 
                            Submitted code may be run with restrictions, including time limit, memory limit, security restriction and so on. 
                            The output of the code will be captured by the system, and compared with the standard output. The system will then return the result.
                            When mistakes were found in a standard output, the submission will be unsuccessful. You must correct any errors in the code, and resubmit for re-judgement.
                        </p>
                    </Jumbotron>
                    <div className="row">
                        <div className="col-8">
                            <h2>Announcements</h2>
                            <hr></hr>
                            <h3>BitCode Round 1</h3>
                            <p>
                                BitCode Round 1 is a great opportunity to prove yourself and get experience in programming competitions. The Championship will be held on 10 May in two different levels of complexity.
                                The problems are made by the leading universities professors, champions of international competitions and coaches of ICPC.<br></br>
                                See you at the leaderboard.
                            </p>
                        </div>
                        <div className="col-4">
                            <div className="p-3">
                                <h4>Upcoming Contest</h4>
                                <hr></hr>
                                { this.state.upcomingContests.length > 0 ?
                                    (this.showUpcomingContests()) : <p>No upcoming contests in this week</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;