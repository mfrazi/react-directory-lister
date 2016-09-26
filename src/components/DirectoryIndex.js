import React from 'react';

export default class DirectoryIndex extends React.Component {
    constructor() {
        super();
    }

    render(){
        var dirIndexLength = this.props.directoryIndex.length;
        var tmp = [{key: 0, name: 'Home'}];
        for(let i=0; i<dirIndexLength; i++) {
            tmp.push({key: i+1, name: this.props.directoryIndex[i]});
        }
        var data = tmp.map(function(di) {
                    if(di.key == dirIndexLength)
                        return (
                            <li key={di.key} className='active'>
                                {di.name}
                            </li>
                        );
                    else
                        return (
                            <li key={di.key}>
                                <a href='#' onClick={() => this.props.clickIndex(di.key)}>
                                    {di.name}
                                </a>
                            </li>
                        );
                    }.bind(this));

        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <ol className='breadcrumb'>
                        {data}
                    </ol>
                </div>
            </div>
        );
    }
}