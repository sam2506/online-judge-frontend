import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { USER_TOKEN_SESSION_ATTRIBUTE_NAME } from "../../service/AuthenticationService"

class Problems extends Component {

    state = {
        problems: []
    }
    
    fetchProblems() {
        var problems = [];
        const token = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
        let axiosConfig = {
            headers: {
                "Authorization": token
            }
        };

        axios.get("http://localhost:8080/problems", axiosConfig)
            .then(res => {
                problems = res.data;
                console.log(problems);
                this.setState({ problems });
            }).catch((err) => {
                console.log(err);
            })
    }

    showProblemsList() {
        var problems = this.state.problems;
        var problemsList = problems.map((problem, index) =>
            <tr key = {problem.problemId}>
                <td>{ index + 1 }</td>
                <td> <a href = { "/problems/" + problem.problemId }>{ problem.problemName }</a></td>
                <td>{ problem.setterName }</td>
            </tr>
        )
        return (
            <tbody>
                {problemsList}
            </tbody>
        )
    }

    componentDidMount() {
        this.fetchProblems();
    }

    render() {
        return (
            <div className="col-8 offset-2">
                <br></br>
                <h4>Problems List</h4> 
                <Table className="m-4" striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Problem Name</th>
                        <th>Setter Name</th>
                        </tr>
                    </thead>
                    { this.showProblemsList() }
                </Table>
            </div>
        );
      }
}

export default Problems;