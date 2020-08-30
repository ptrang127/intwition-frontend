import React from 'react';
import './NavBar.css';
import { withTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, Box, IconButton } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import {
    Link,
} from "react-router-dom";


class NavBar extends React.Component {

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton component={Link} to="/" >
                        <CloudIcon fontSize="large" />
                    </IconButton>
                    <Box className="options">
                        <Button component={Link} to="/" color="inherit">Home</Button>
                        <Button component={Link} to="/about" color="inherit" pl="2rem">About</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        )
    }

}

export default withTheme(NavBar);
