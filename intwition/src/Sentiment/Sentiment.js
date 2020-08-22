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

class Sentiment extends React.Component {
    constructor(props) {
        super(props);
        // local state
        console.log(props);
        this.state = {
            token_count: this.props.sentiment.token_count,
            positive_count: this.props.sentiment.positive_count,
            negative_count: this.props.sentiment.negative_count,
            sum_score: this.props.sentiment.sum_score,
            comparative_score: this.props.sentiment.comparative_score,
            result: this.props.sentiment.result,
            summary: this.props.sentiment.summary,
        };
    }

    // render component if props change
    componentDidUpdate(prevProps) {
        if (prevProps.sentiment !== this.props.sentiment) {
            this.setState({
                token_count: this.props.sentiment.token_count,
                positive_count: this.props.sentiment.positive_count,
                negative_count: this.props.sentiment.negative_count,
                sum_score: this.props.sentiment.sum_score,
                comparative_score: this.props.sentiment.comparative_score,
                result: this.props.sentiment.result,
                summary: this.props.sentiment.summary,
            });
        }
    }


    render() {

        // generate face
        let result = this.state.result;
        let summary = this.state.summary;
        console.log(result);
        let face;

        if (result === 'Very Negative') {
            face = <SentimentVeryDissatisfied fontSize="large" style={{ fill: "red", fontSize: 200 }}></SentimentVeryDissatisfied>
        } else if (result === 'Negative') {
            face = <SentimentDissatisfied fontSize="large" style={{ fill: "orange", fontSize: 200 }}></SentimentDissatisfied>
        } else if (result === "Neutral") {
            face = <SentimentSatisfied fontSize="large" style={{ fill: "gold", fontSize: 200 }}></SentimentSatisfied>
        } else if (result === "Positive") {
            face = <SentimentSatisfiedAlt fontSize="large" style={{ fill: "yellowgreen", fontSize: 200 }}></SentimentSatisfiedAlt>
        } else if (result === "Very Positive") {
            face = <SentimentVerySatisfied fontSize="large" style={{ fill: "green", fontSize: 200 }}></SentimentVerySatisfied>
        } else if (result === "Error") {
            face = <Error fontSize="large" style={{ fill: "red", fontSize: 200 }}></Error>
        }

        return (this.props.sentiment.result ?
            <div className="sentiment-container" key={this.props.sentiment}>
                <div className="sentiment-result">
                    <span>
                        {face}
                    </span>
                    <div>{result}</div>
                </div>
                <div className="sentiment-analysis">
                    <p>Total Tokens: {this.state.token_count}</p>
                    <p>Positive Tokens: {this.state.positive_count}</p>
                    <p>Negative Tokens: {this.state.negative_count}</p>
                    <p>{summary}</p>
                </div>
            </div >
            : null)
    }
}

export default withTheme(Sentiment);
