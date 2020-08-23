import React from 'react';
import './NavBar.css';
import { withTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

class NavBar extends React.Component {

    render() {
        return <AppBar position="fixed">
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
