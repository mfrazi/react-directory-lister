import React from 'react';

import Name from './Name';
import Size from './Size';
import LastModified from './LastModified';

export default class DirectoryItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <a href="#" onClick={this.props.clickSection}>
                <div className="row boldHover">
                    <div className="col-xs-8 col-md-7">
                        <Name Name={this.props.Name} iconPath={this.props.iconPath} />
                    </div>
                    <div className="col-xs-4 col-md-3">
                        <LastModified lastModified={this.props.lastModified} />
                    </div>
                    <div className="hidden-xs hidden-sm col-md-2">
                        <Size Size={this.props.Size} />
                    </div>
                </div>
            </a>
        );
    }
}