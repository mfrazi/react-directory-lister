import React from 'react';

export default class ItemHeader extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='col-xs-8 col-md-7'>
                    <strong>Name</strong>
                </div>
                <div className='col-xs-4 col-md-3'>
                    <strong>Last modified</strong>
                </div>
                <div className='hidden-xs hidden-sm col-md-2'>
                    <strong>Size</strong>
                </div>
                <br/>
                <hr/>
            </div>
        );
    }
}
