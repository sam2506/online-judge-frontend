import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap'; 
import { NavDropdown } from 'react-bootstrap'; 
import { Button } from 'react-bootstrap'; 
import AceEditor from 'react-ace'; 

class Problem extends Component {

    state = {
        languages: ["C++", "C", "Java", "Python"],
        currentLanguage: "Select Language"
    }

    selectLanguage(e, language) {
        this.setState({currentLanguage: language});
    }

    showLanguagesInDropdown() {
        var languages = this.state.languages;
        return languages.map((language, index) => 
            <NavDropdown.Item onClick={((e) => this.selectLanguage(e, language))} eventKey = {index}>{language}</NavDropdown.Item>
        )
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="col-10 offset-1"> 
                <br></br>
               <h1>Problem Name</h1>
               <h5 className="d-inline">By <h5 className="d-inline text-primary">Setter Name </h5></h5>
               <br></br>
               <br></br>
               <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant="tabs" activeKey={window.location.pathname} className="mr-auto">
                            <Nav.Link className="p-3 mr-4" href={"/problems/" + this.props.match.params.id}>Problem</Nav.Link>
                            <Nav.Link className="p-3 mx-4" href={"/problems/" + this.props.match.params.id + "/submissions"}>Submissions</Nav.Link>
                            <Nav.Link className="p-3 mx-4" href={"/problems/" + this.props.match.params.id + "/editorial"}>Editorial</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br></br>
                <p>
                    You are given a string s, consisting of lowercase Latin letters. While there is at least one character in the string s that is repeated at least twice, you perform the following operation:
                    you choose the index i (1≤i≤|s|) such that the character at position i occurs at least two times in the string s, and delete the character at position i, that is, replace s with s1s2…si−1si+1si+2…sn.
                    For example, if s="codeforces", then you can apply the following sequence of operations:
                    i=6⇒s="codefrces";
                    i=1⇒s="odefrces";
                    i=7⇒s="odefrcs";
                    Given a given string s, find the lexicographically maximum string that can be obtained after applying a certain sequence of operations after which all characters in the string become unique.

                    A string a of length n is lexicographically less than a string b of length m, if:

                    there is an index i (1≤i≤min(n,m)) such that the first i−1 characters of the strings a and b are the same, and the i-th character of the string a is less than i-th character of string b;
                    or the first min(n,m) characters in the strings a and b are the same and n m
                    For example the string is lexicographically less than the string b

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
                <br></br>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown title={this.state.currentLanguage} id="basic-nav-dropdown">
                            {this.showLanguagesInDropdown()}
                        </NavDropdown>
                        </Nav>
                        <Button variant="outline-primary">Submit</Button>
                    </Navbar.Collapse>
                </Navbar>
                <AceEditor showPrintMargin={false} width="100%"/>
                <br></br>
            </div>
        );
      }
}

export default Problem;