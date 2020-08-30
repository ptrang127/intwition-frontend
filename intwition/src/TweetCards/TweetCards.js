
import React from 'react';
import './TweetCards.css';
import { withTheme } from '@material-ui/core/styles'
import { Card, CardContent, Typography, CardActions, Button, Box } from '@material-ui/core';

class TweetCards extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tweets: this.props.tweets
        };
    }

    // render component if props change
    componentDidUpdate(prevProps) {
        if (prevProps.tweets !== this.props.tweets) {
            this.setState({ tweets: this.props.tweets });
        }
    }

    // open a tweet
    openTweet(tweet) {
        window.open("https://www.twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str, "_blank");
    }

    render() {
        return (
            <Box className="cards">
                {this.props.tweets.map(tweet => {
                    return (
                        <Card key={tweet.full_text} variant="outlined" className="card">
                            <CardContent>
                                <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                                    @{tweet.user.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {tweet.full_text}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => this.openTweet(tweet)}>
                                    View Tweet
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>
        )
    }
    
}

export default withTheme(TweetCards);
