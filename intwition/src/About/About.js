
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
                                intwition is a web application used to gain insight into the fast-paced happenings and discussions on Twitter. Utilizing Twitter's API, we at intwition are able to provide meaningful data using intensive deep maching learning algorithms.
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
