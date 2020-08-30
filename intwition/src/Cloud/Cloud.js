
import React from 'react';
import './Cloud.css';
import { TagCloud } from 'react-tagcloud';
import { withTheme } from '@material-ui/core/styles'

class Cloud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cloud: this.props.cloud
        };

        this.clickCloud = this.clickCloud.bind(this);

    }

    // render component if props change
    componentDidUpdate(prevProps) {
        if (prevProps.cloud !== this.props.cloud) {
            this.setState({ cloud: this.props.cloud });
        }
    }

    // clicking on a word in the word cloud
    clickCloud(event) {
        alert("Word: " + event.value + "\nGotta fix this lmao")
        // this.setState({ loading: true, query: event.value, sentiment: '', tweets: [], cloud: [] });
        // this.analyze();
    }

    render() {

        var cloud = this.state.cloud;
        var options = {
            luminosity: 'light',
            hue: 'blue',
        };

        return (this.props.cloud ?
            <TagCloud
                minSize={12}
                maxSize={35}
                tags={cloud}
                colorOptions={options}
                className="simple-cloud"
                onClick={this.clickCloud}
            ></TagCloud>
            : null)
    }
}

export default withTheme(Cloud);
