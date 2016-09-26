import React from 'react';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.isLoading === false)
            var status = 'hidden';
        else
            status = '';
        return (
            <div id='loader' className={status+' img-responsive'}>
                <div id="loader-img-container">
                    <img src='./assets/img/reload.svg' />
                    <h4>Loading....</h4>
                </div>
            </div>
        );
    }
}