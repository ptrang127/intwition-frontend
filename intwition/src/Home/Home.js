
import React from 'react';
import './Home.css';
import axios from 'axios';
import { TextField, Button, CircularProgress, Grid, Box, Typography } from '@material-ui/core';
import { TagCloud } from 'react-tagcloud';
import { withTheme } from '@material-ui/core/styles';
import Sentiment from '../Sentiment/Sentiment';
import TweetCards from '../TweetCards/TweetCards';

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
        axios.get('https://intwition-express-wi4vuqed3q-uc.a.run.app/analyze/term/' + this.state.query)
            .then(res => {
                let response = res.data;
                this.setState({ loading: false, sentiment: response.sentiment, tweets: response.tweets, cloud: response.cloud })
            }).catch(err => {
                this.setState({ loading: false, sentiment: "Error", tweets: [], cloud: [] })
            })
    }

    render() {

        let loading = this.state.loading;
        let query = this.state.query;
        let sentiment = this.state.sentiment;
        let tweets = this.state.tweets;
        let cloud = this.state.cloud;

        let options = {
            luminosity: 'light',
            hue: 'blue',
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <Box textAlign="center">
                        <Typography color="primary" variant="h2" style={{ fontWeight: "bold", paddingTop: "2rem", paddingBottom: "2rem" }}>intwition.io</Typography>
                        <TextField
                            value={query} variant="outlined"
                            label="Query"
                            onChange={this.handleChange}
                            onKeyPress={this.keyPress}
                            autoFocus />
                        <Box className="input">
                            <Button variant="contained" onClick={this.handleSubmit}>Analyze</Button>
                        </Box>
                        {
                            loading ?
                                <Box>
                                    <CircularProgress />
                                    <p>Analyzing tweets...</p>
                                </Box>
                                : null
                        }
                    </Box>
                </Grid>
                {tweets.length > 0 ?
                    <>
                        <Grid item xs={12} lg={6}>
                            <div className="component">
                                <Sentiment sentiment={sentiment}></Sentiment>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div class="component">
                                <TagCloud
                                    minSize={12}
                                    maxSize={35}
                                    tags={cloud}
                                    colorOptions={options}
                                    className="simple-cloud"
                                    onClick={this.clickCloud}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <div className="component">
                                <TweetCards tweets={tweets}></TweetCards>
                            </div>
                        </Grid>
                    </>
                    : null
                }
            </Grid>

        );
    }
}

export default withTheme(Home);
