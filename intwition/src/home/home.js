
import React from 'react';
import './home.css';
import axios from 'axios';
import { TextField, Button, CircularProgress, Grid } from '@material-ui/core';
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
            sentiment: {},
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
            this.setState({ loading: true, sentiment: '', tweets: [], cloud: [] });
            event.preventDefault();
            this.analyze();
        }
    }

    // call API (TODO: turn into service)
    analyze() {
        axios.get('http://localhost:8080/analyze/term/' + this.state.query)
            .then(res => {
                let response = res.data;
                this.setState({ loading: false, sentiment: response.sentiment, tweets: response.tweets.statuses, cloud: response.cloud })
            }).catch(err => {
                this.setState({ loading: false, sentiment: "Error", tweets: [], cloud: [] })
            })
    }

    render() {

        let loading = this.state.loading;
        let query = this.state.query;
        let sentiment = this.state.sentiment;
        let tweets = this.state.tweets.slice(0, 6);
        let cloud = this.state.cloud;

        let options = {
            luminosity: 'light',
            hue: 'blue',
        }

        return (
            <div>
                <Grid container spacing={1} justify="center"
                    alignItems="flex-start">
                    <Grid item xs={12}>
                        <h1 className="intwition-title">intwition.io</h1>
                        <div>
                            <TextField
                                value={query} variant="outlined"
                                label="Query"
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
                    </Grid>
                    <Grid item sm={6}>
                        <div className="component">
                            <Sentiment sentiment={sentiment}></Sentiment>
                        </div>
                    </Grid>
                    <Grid item sm={6}>
                        <div className="component">
                            <TweetCards tweets={tweets}></TweetCards>
                        </div>
                    </Grid>
                </Grid>

                {
                    cloud.length > 0 ? <div className="cloud">
                        <TagCloud
                            minSize={12}
                            maxSize={35}
                            tags={cloud}
                            colorOptions={options}
                            className="simple-cloud"
                            onClick={this.clickCloud}
                        />
                    </div>
                        : null
                }

            </div>
        );
    }
}

export default withTheme(Home);
