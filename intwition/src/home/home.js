
import React from 'react';
import './home.css';
import axios from 'axios';
import { TextField, Button, CircularProgress, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { TagCloud } from 'react-tagcloud';
import { withTheme } from '@material-ui/core/styles';
import Sentiment from '../sentiment/sentiment';
import TweetCards from '../tweetCards/tweetCards';

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
        this.setState({ query: event.target.value });
    }

    // text field submit
    handleSubmit(event) {
        this.setState({ loading: true, sentiment: '', tweets: [], cloud: [] });
        this.analyze();
    }

    // clicking on a word in the word cloud
    clickCloud(event) {
        this.setState({ loading: true, query: event.value, sentiment: '', tweets: [], cloud: [] })
        this.analyze();
    }

    // handle each keystroke
    keyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.analyze();
        }
    }

    // open a tweet
    openTweet(tweet) {
        window.open("https://www.twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str, "_blank");
    }

    // call API (TODO: turn into service)
    analyze() {
        axios.get('https://intwition-express-wi4vuqed3q-uc.a.run.app//analyze/term/' + this.state.query)
            .then(res => {
                let response = res.data;
                this.setState({ loading: false, sentiment: response.sentiment.result, tweets: response.tweets.statuses, cloud: response.cloud })
            }).catch(err => {
                this.setState({ loading: false, sentiment: "Error", tweets: [], cloud: [] })
            })
    }

    render() {

        let loading = this.state.loading;
        let query = this.state.query;
        let sentiment = this.state.sentiment;
        let tweets = this.state.tweets

        let cloud = this.state.cloud;
        let { theme } = this.props;

        let options = {
            luminosity: 'light',
            hue: 'blue',
        }

        const style = {
            color: theme.palette.primary.main
        };

        return (
            <div className="sentiment-container">

                <h1>intwition.io</h1>

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

                {
                    loading ?
                        <div> <CircularProgress />
                            <p>Analyzing tweets...</p>
                        </div>
                        : null
                }

                <Sentiment sentiment={sentiment}></Sentiment>
                <TweetCards tweets={tweets}></TweetCards>

                <div className="cloud">
                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={cloud}
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
