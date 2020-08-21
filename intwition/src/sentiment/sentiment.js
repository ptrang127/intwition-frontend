
import React from 'react';
import './sentiment.css';
import {
    SentimentVeryDissatisfied,
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied,
    Error
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles'

class Sentiment extends React.Component {
    constructor(props) {
        super(props);
        // local state
        console.log(props);
        this.state = {
            sentiment: this.props.sentiment
        };
    }

    // render component if props change
    componentDidUpdate(prevProps) {
        if (prevProps.sentiment !== this.props.sentiment) {
            this.setState({ sentiment: this.props.sentiment });
        }
    }
    

    render() {

        // generate face
        let sentiment = this.state.sentiment;
        let face;

        if (sentiment === 'Very Negative') {
            face = <SentimentVeryDissatisfied fontSize="large" style={{ fill: "red", fontSize: 200 }}></SentimentVeryDissatisfied>
        } else if (sentiment === 'Negative') {
            face = <SentimentDissatisfied fontSize="large" style={{ fill: "orange", fontSize: 200 }}></SentimentDissatisfied>
        } else if (sentiment === "Neutral") {
            face = <SentimentSatisfied fontSize="large" style={{ fill: "gold", fontSize: 200 }}></SentimentSatisfied>
        } else if (sentiment === "Positive") {
            face = <SentimentSatisfiedAlt fontSize="large" style={{ fill: "yellowgreen", fontSize: 200 }}></SentimentSatisfiedAlt>
        } else if (sentiment === "Very Positive") {
            face = <SentimentVerySatisfied fontSize="large" style={{ fill: "green", fontSize: 200 }}></SentimentVerySatisfied>
        } else if (sentiment === "Error") {
            face = <Error fontSize="large" style={{ fill: "red", fontSize: 200 }}></Error>
        }

        return (this.props.sentiment ?
            <div key={this.props.sentiment}>
                <span>
                    {face}
                </span>
                <div>{sentiment}</div>
            </div >
            : null)
    }
}

export default withTheme(Sentiment);
