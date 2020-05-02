
import React from 'react';
import './sentiment.css';
import axios from 'axios';

import { TextField, Button, CircularProgress, useTheme } from '@material-ui/core';
import {
    SentimentVeryDissatisfied,
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied,
    Error
} from '@material-ui/icons';
import { TagCloud } from 'react-tagcloud';
import { withTheme } from '@material-ui/core/styles'

class Sentiment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: '', sentiment: '', loading: false, tweets: [], cloud: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickCloud = this.clickCloud.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value, sentiment: '', tweets: [], cloud: [] });
    }

    handleSubmit(event) {
        this.setState({ sentiment: '', loading: true, tweets: [], cloud: [] });
        event.preventDefault();
        this.analyze();
    }

    clickCloud(event) {
        this.setState({ query: event.value, sentiment: '', loading: true, tweets: [], cloud: [] })
        this.analyze();
    }

    keyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.analyze();
        }
    }

    analyze() {
        axios.get('http://localhost:8080/sentiment/term/' + this.state.query)
            .then(res => {
                let response = res.data;
                this.setState({ sentiment: response.result, loading: false, tweets: response.tweets, cloud: response.cloud })
            }).catch(err => {
                this.setState({ sentiment: "Error", loading: false, tweets: [], cloud: [] })
            })
    }

    render() {

        let sentiment = this.state.sentiment;
        let loading = this.state.loading;
        let query = this.state.query;
        let face;

        const data = this.state.cloud;
        const { theme } = this.props;

        const options = {
            luminosity: 'dark',
            hue: 'blue',
        }

        if (loading) {
            face = <>
                <CircularProgress />
                <p>Analyzing tweets...</p>
            </>
        } else if (sentiment === 'Very Negative') {
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

        let tweets = this.state.tweets.map(tweet => {
            return <li>{tweet}</li>
        });

        const style = {
            color: theme.palette.primary.main
        };

        return (
            <div>
                <h1 style={style}>intwition.io</h1>
                <div className="input">
                    <TextField 
                    value={query} variant="outlined" 
                    label="Query" color="primary" 
                    onChange={this.handleChange} 
                    onKeyPress={this.keyPress}
                    autoFocus/>
                </div>
                <div className="input">
                    <Button variant="contained" onClick={this.handleSubmit}>Analyze</Button>
                </div>
                <span>
                    {face}
                </span>
                <p>{this.state.sentiment}</p>
                <div className="cloud">
                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={data}
                        colorOptions={options}
                        className="simple-cloud"
                        onClick={this.clickCloud}
                    />
                </div>
            </div>
        );
    }
}

export default withTheme(Sentiment);
