import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"

class Contests extends Component {

    state = {
        contests: []
    }
    
    fetchContests() {
        var contests = [];
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };

        axios.get("/contests", axiosConfig)
            .then(res => {
                contests = res.data;
                console.log(contests);
                this.setState({ contests });
            }).catch((err) => {
                console.log(err);
            })
    }

    showContestList(contests) {
        var contestList = contests.map((contest, index) =>
            <tr key = {contest.contestId}>
                <td>{ index + 1 }</td>
                <td> <a href = { "/contests/" + contest.contestId }>{ contest.contestName }</a></td>
                <td>{contest.moderators.map((moderator, index) => <div className="text-danger" key = {index}>{moderator}</div>)}</td>
                <td>{new Date(contest.startTime).toString()}</td>
                <td>{Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60*60))}:
                {Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60)) -
                60 * Math.floor((new Date(contest.endTime) - new Date(contest.startTime))/(1000*60*60))}</td>
            </tr>
        )
        return (
            <tbody>
                {contestList}
            </tbody>
        )
    }

    sortContestByStartTime(contest1, contest2) {
        if ( contest1.startTime < contest2.startTime ){
          return -1;
        }
        if ( contest1.startTime > contest2.startTime ){
          return 1;
        }
        return 0;
    }

    sortContestByStartTimeInReverse(contest1, contest2) {
        if ( contest1.startTime < contest2.startTime ){
          return 1;
        }
        if ( contest1.startTime > contest2.startTime ){
          return -1;
        }
        return 0;
    }

    showCurrentOrUpcomingContestList() {
        var currentOrUpcomingContests = [];
        const contests = this.state.contests;
        var currentTime = new Date();
        contests.map((contest) => {
            if(new Date(contest.endTime) > currentTime) {
                currentOrUpcomingContests.push(contest)
            }
        })
        currentOrUpcomingContests.sort(this.sortContestByStartTime);
        return this.showContestList(currentOrUpcomingContests)
    }

    showPastContestList() {
        var pastContests = [];
        const contests = this.state.contests;
        var currentTime = new Date();
        contests.map((contest) => {
            if(new Date(contest.endTime) < currentTime) {
                pastContests.push(contest)
            }
        })
        pastContests.sort(this.sortContestByStartTimeInReverse);
        return this.showContestList(pastContests)
    }

    componentDidMount() {
        this.fetchContests();
    }

    render() {
        return (
            <div className="col-8 offset-2"> 
                <br></br>
                <h4>Current or Upcoming Contests</h4>
                <Table className="m-4" striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Contest Name</th>
                        <th>Moderators</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        </tr>
                    </thead>
                    { this.showCurrentOrUpcomingContestList() }
                </Table>
                <br></br>
                <h4>Past Contests</h4>
                <Table className="m-4" striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Contest Name</th>
                        <th>Moderators</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        </tr>
                    </thead>
                    { this.showPastContestList() }
                </Table>
            </div>
        );
      }
}

export default Contests;