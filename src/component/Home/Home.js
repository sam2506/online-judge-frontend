import { Component } from "react";
import { Jumbotron } from "react-bootstrap"
import { Button } from "react-bootstrap"

class Home extends Component {
    render() {
        return (
            <div>
                <div className="col-8 offset-2 mt-3">
                    <Jumbotron>
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
                                <h4>Upcoming Contests</h4>
                                <hr></hr>
                                <p><a className="link-primary">BitCode Round 1</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;