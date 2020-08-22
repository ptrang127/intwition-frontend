import React from 'react';
import './NavBar.css';
import { withTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, IconButton, Box } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppBar position="static">
            <Toolbar>
                <CloudIcon fontSize="large" />
                <Box className="options">
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                </Box>
            </Toolbar>
        </AppBar>
    }
}

export default withTheme(NavBar);
