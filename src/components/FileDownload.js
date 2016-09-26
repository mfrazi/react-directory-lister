import React, {Component, PropTypes} from 'react';

var config = require('../../config');

export default class FileDownload extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(this.props.actionPath != '') {
            if(this.downloadFile !== null) {
                this.downloadFile.submit();
                this.props.clearDownloadPath();
            }
        }
    }

    render() {
        return (
            <div>
                <form ref={(ref) => this.downloadFile = ref}
                    action={config.API_SERVER+this.props.actionPath}
                    className='hidden'
                    method='GET'
                      target='_blank'
                >
                </form>
            </div>
        );
    }
}