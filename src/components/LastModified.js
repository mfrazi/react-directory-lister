import React from 'react';

export default class LastModified extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h5><samp>{this.props.lastModified}</samp></h5>
            </div>
        );
    }
}