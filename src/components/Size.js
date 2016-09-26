import React from 'react';

export default class Size extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>
                <h5><samp>{this.props.Size}</samp></h5>
            </div>
        );
    }
}
