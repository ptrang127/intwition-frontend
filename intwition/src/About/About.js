
import React from 'react';
import './About.css';
import { withTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';


class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <Box textAlign="center">
                <h1 className="about-title">intwition.io</h1>
                <Box textAlign="left" width="50">
                    <Typography>Test</Typography>

                </Box>
            </Box>
        );
    }
}

export default withTheme(About);
