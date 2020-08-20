
import React from 'react';
import './home.css';
import axios from 'axios';

import { TextField, Button, CircularProgress, Grid, Card, CardContent, CardActions, Typography } from '@material-ui/core';
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

class Home extends React.Component {
    constructor(props) {
        super(props);

        // local state
        this.state = {
            query: '',
            loading: false,
            sentiment: '',
            tweets: [],
            cloud: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickCloud = this.clickCloud.bind(this);
        this.keyPress = this.keyPress.bind(this);

    }

    // when user types in text field
    handleChange(event) {
        this.setState({ query: event.target.value, sentiment: '', tweets: [], cloud: [] });
    }

    // text field submit
    handleSubmit(event) {
        this.setState({ sentiment: '', loading: true, tweets: [], cloud: [] });
        event.preventDefault();
        this.analyze();
    }

    // clicking on a word in the word cloud
    clickCloud(event) {
        this.setState({ query: event.value, sentiment: '', loading: true, tweets: [], cloud: [] })
        this.analyze();
    }

    // handle each keystroke
    keyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.analyze();
        }
    }

    openTweet(tweet) {
        window.open("https://www.twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str, "_blank");
    }

    // call API (TODO: turn into service)
    analyze() {
        axios.get('https://intwition-express-wi4vuqed3q-uc.a.run.app/analyze/term/' + this.state.query)
            .then(res => {
                let response = res.data;
                this.setState({ sentiment: response.sentiment.result, loading: false, tweets: response.tweets.statuses, cloud: response.cloud })
            }).catch(err => {
                this.setState({ sentiment: "Error", loading: false, tweets: [], cloud: [] })
            })
    }

    render() {

        let sentiment = this.state.sentiment;
        let loading = this.state.loading;
        let query = this.state.query;
        let tweets = this.state.tweets
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

        let cards = tweets.map(tweet => {
            return (
                <>
                    <Card variant="outlined" className="card">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                {tweet.user.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {tweet.full_text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small" onClick={() => this.openTweet(tweet)}>
                                View Tweet
                    </Button>
                        </CardActions>
                        <span>{tweet.retweet_count}</span>
                        <span>{tweet.favorite_count}</span>
                    </Card>
                </>
            )
        })

        const style = {
            color: theme.palette.primary.main
        };

        return (
            <div className="sentiment-container">
                <h1 style={style}>intwition.io</h1>
                <div className="input">
                    <TextField
                        value={query} variant="outlined"
                        label="Query" color="primary"
                        className="input"
                        InputProps={{
                            style: {
                                color: "#F5F5F5",
                                borderColor: "#F5F5F5"
                            }
                        }}
                        onChange={this.handleChange}
                        onKeyPress={this.keyPress}
                        autoFocus />
                </div>
                <div className="input">
                    <Button variant="contained" onClick={this.handleSubmit}>Analyze</Button>
                </div>
                <span>
                    {face}
                </span>
                <p>{sentiment}</p>
                <div className="cards">
                    {cards}
                </div>

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

export default withTheme(Home);
