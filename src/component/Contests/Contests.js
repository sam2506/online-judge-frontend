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

        axios.get("http://localhost:8080/contests", axiosConfig)
            .then(res => {
                contests = res.data;
                console.log(contests);
                this.setState({ contests });
            }).catch((err) => {
                console.log(err);
            })
    }

    showContestList() {
        var contests = this.state.contests;
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

    componentDidMount() {
        this.fetchContests();
    }

    render() {
        return (
            <div className="col-10 offset-1"> 
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Contest Name</th>
                        <th>Moderators</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        </tr>
                    </thead>
                    { this.showContestList() }
                </Table>
            </div>
        );
      }
}

export default Contests;