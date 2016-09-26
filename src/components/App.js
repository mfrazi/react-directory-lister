import React from 'react';

import * as appActions from '../actions/AppActions';
import appStore from '../stores/AppStore';

import DirectoryIndex from './DirectoryIndex';
import DirectoryItem from './DirectoryItem';
import FileDownload from './FileDownload';
import ItemHeader from './ItemHeader';
import Loader from './Loader';

var config = require('../../config');

export default class App extends React.Component {
    constructor() {
        super();
        this.getDirectory = this.getDirectory.bind(this);
        this.state = {
            baseDirectory: [],
            listDirectory: appStore.getAll(),
            downloadPath: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        document.title = config.APP_NAME;
    }

    componentWillMount() {
        appStore.on('change', this.getDirectory);
    }

    componentWillUnmount() {
        appStore.removeListener('change', this.getDirectory);
    }

    getDirectory() {
        this.setState({
            listDirectory: appStore.getAll(),
            isLoading: appStore.getLoading(),
        })
    }

    setLoader(status) {
        this.setState({
            isLoading: status,
        });
    }

    clickSection(data) {
        this.setLoader(true);

        if(data[1] == true) {
            this.state.baseDirectory.push(data[0]);
            appActions.getListDirectory(this.state.baseDirectory);
        }
        else {
            var tmp = (this.state.baseDirectory).toString();
            tmp = tmp + ',' + data[0];
            this.state.downloadPath = tmp;
            this.setState({
                downloadPath: tmp.toString(),
            });
        }
    }

    clickIndex(data) {
        this.setLoader(true);
        this.state.baseDirectory.splice(data,this.state.baseDirectory.length);
        appActions.getListDirectory(this.state.baseDirectory);
    }

    clearDownloadPath() {
        this.setState({
            downloadPath: '',
            isLoading: false,
        });
    }

    render() {
        return (
            <div>
                {/*Hidden Content*/}
                <Loader isLoading={this.state.isLoading} />
                <FileDownload actionPath={this.state.downloadPath} clearDownloadPath={this.clearDownloadPath.bind(this)} />

                {/*Content Section Start*/}
                <div className='container'>
                    <DirectoryIndex
                        directoryIndex={this.state.baseDirectory}
                        clickIndex={this.clickIndex.bind(this)}
                    />
                    <br/>

                    <ItemHeader />

                    {this.state.listDirectory.map(function (ld) {
                        var clickSection = this.clickSection.bind(this, [ld.name, ld.isDirectory]);
                        return (
                            <DirectoryItem
                                key = {ld.id}
                                Name = {ld.name}
                                lastModified = {ld.ctime}
                                Size = {ld.size}
                                isDirectory = {ld.isDirectory}
                                iconPath = {ld.iconPath}
                                clickSection = {clickSection}
                            />
                        );
                    }, this)}
                </div>
                {/*Content Section End*/}

            </div>
        );
    }
}

