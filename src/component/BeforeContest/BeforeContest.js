import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import CountDownTimer from "../../utils/CountDownTimer/CountDownTimer";
import { Table } from "react-bootstrap";

class BeforeContest extends Component {

    showContestDetails() {
        const contest = this.props.contest;
        var contestDetails = 
            <tr key = {contest.contestId}>
                <td> <a href = { "/contests/" + contest.contestId }>{ contest.contestName }</a></td>
                <td>{contest.moderators.map((moderator, index) => <div className="text-danger" key = {index}>{moderator}</div>)}</td>
                <td>{new Date(contest.startTime).toString()}</td>
                <td>{Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60*60))}:
                {Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60)) -
                60 * Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60*60))}</td>
            </tr>
        return (
            <tbody>
                {contestDetails}
            </tbody>
        )
    }
    
    render() {
        const contest = this.props.contest;
        return (
            <div className="col-8 offset-2">
                <br></br>
                <h4>{contest.contestName}</h4>
                <Table className="m-4" striped bordered hover>
                    <thead>
                        <tr>
                        <th>Contest Name</th>
                        <th>Moderators</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        </tr>
                    </thead>
                    { this.showContestDetails() }
                </Table>
                <br></br>
                <div className="offset-4 col-4">
                    <h5 className="text-center">Before Contest</h5>
                    <div className="ml-5">
                        <CountDownTimer time={contest.startTime}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BeforeContest;