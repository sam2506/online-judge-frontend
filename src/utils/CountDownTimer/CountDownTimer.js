import { Component } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import CountDown from 'react-countdown';

class CountDownTimer extends Component {
    
    zeroPadANumber(number) {
        if(number < 10)
            number = "0" + number;
        return number;
    }

    renderer = ({ days, hours, minutes, seconds }) => {
        days = this.zeroPadANumber(days);
        hours = this.zeroPadANumber(hours);
        minutes = this.zeroPadANumber(minutes);
        seconds = this.zeroPadANumber(seconds);
        return <div className="container">
                    <div className="row">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">{days}</div>
                        <div className="mt-3">:</div> 
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">{hours}</div> 
                        <div className="mt-3">:</div> 
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">{minutes}</div>
                        <div className="mt-3">:</div> 
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">{seconds}</div>
                    </div>
                </div>
                
    }

    render() {
        return (
            <CountDown
                date={this.props.time}
                zeroPadTime={2}
                renderer={this.renderer}
            />
        )
    }
}

export default CountDownTimer;