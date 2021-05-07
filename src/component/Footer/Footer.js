import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';

class Footer extends Component {
    render() {
        return (
            <div className="offset-2 col-8 py-3">
                <hr></hr>
                <div className="row">
                    <div className="col-6">
                        © {new Date().getFullYear()} Copyright: BitCode. All rights reserved
                    </div>
                    <div className="col-6 text-right">
                        <a href="https://github.com/sam2506"><i className="mr-2 fa-2x fa fa-github"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;