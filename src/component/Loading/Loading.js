import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';

class Loading extends Component {
    render() {
        return(
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <i style={{color: "#163663"}} className="mb-5 fa-5x fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
        )
    }
}

export default Loading;

