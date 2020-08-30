import React from 'react';
import './Sentiment.css';
import {
    SentimentVeryDissatisfied,
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied,
    Error
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core';

class Sentiment extends React.Component {

    constructor(props) {
        super(props);
        // local state
        this.state = {
            magnitude: this.props.sentiment.magnitude,
            score: this.props.sentiment.score
        };
    }

    // render component if props change
    componentDidUpdate(prevProps) {
        if (prevProps.sentiment !== this.props.sentiment) {
            this.setState({
                magnitude: this.props.sentiment.magnitude,
                score: this.props.sentiment.magnitude
            });
        }
    }

    render() {

        // generate face
        var score = this.state.score;
        var sentiment;
        var face;

        if (score < -0.3) {
            sentiment = "Very Negative";
            face = <SentimentVeryDissatisfied fontSize="large" style={{ fill: "red", fontSize: 200 }}></SentimentVeryDissatisfied>
        } else if (score < -0.1) {
            sentiment = "Negative";
            face = <SentimentDissatisfied fontSize="large" style={{ fill: "orange", fontSize: 200 }}></SentimentDissatisfied>
        } else if (score < 0.1) {
            sentiment = "Neutral";
            face = <SentimentSatisfied fontSize="large" style={{ fill: "gold", fontSize: 200 }}></SentimentSatisfied>
        } else if (score < 0.3) {
            sentiment = "Positive";
            face = <SentimentSatisfiedAlt fontSize="large" style={{ fill: "yellowgreen", fontSize: 200 }}></SentimentSatisfiedAlt>
        } else if (score < 1.1) {
            sentiment = "Very Positive";
            face = <SentimentVerySatisfied fontSize="large" style={{ fill: "green", fontSize: 200 }}></SentimentVerySatisfied>
        } else {
            sentiment = "Error";
            face = <Error fontSize="large" style={{ fill: "red", fontSize: 200 }}></Error>
        }

        return (face ?
            <Box className="sentiment-container" key={this.props.sentiment}>
                <Box className="sentiment-result">
                    <span>
                        {face}
                    </span>
                    <Box>{sentiment}</Box>
                </Box>
                <Box className="sentiment-analysis">
                </Box>
            </Box >
            : null)
    }
    
}

export default withTheme(Sentiment);
