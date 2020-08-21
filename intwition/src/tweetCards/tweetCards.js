
import React from 'react';
import './tweetCards.css';
import { withTheme } from '@material-ui/core/styles'
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

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
            <>
                {this.props.tweets.map(tweet => {
                    return <span key={tweet.full_text}>
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
                    </span>
                })}
            </>
        )
    }
}

export default withTheme(TweetCards);
