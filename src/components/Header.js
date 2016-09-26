import React from 'react';

var config = require('../../config');

export default class Header extends React.Component {
    render() {
       return (
        <div>
            <nav id='navbar-margin' className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='#'>
                            <img alt={config.APP_NAME} src='.' />
                        </a>
                    </div>
                </div>
            </nav>
        </div>
        );
    }
}
