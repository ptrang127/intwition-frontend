
import React from 'react';
import './About.css';
import { withTheme } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';


class About extends React.Component {

    render() {

        return (
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Box textAlign="center">
                        <Typography color="primary" variant="h2" style={{ fontWeight: "bold", paddingTop: "2rem", paddingBottom: "2rem" }}>intwition.io</Typography>
                    </Box>
                    <Grid container>
                        <Grid lg={3}></Grid>
                        <Grid lg={6}>
                            <Typography variant="subtitle1">
                                intwition is a web application used to gain insight into the fast-paced happenings and discussions on Twitter. 
                                Utilizing the Twitter and Google Cloud Natural Language API, we at intwition use powerful pre-trained models to understand social media sentiment and customer conversations.
                            </Typography>
                        </Grid>
                        <Grid lg={3}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default withTheme(About);
