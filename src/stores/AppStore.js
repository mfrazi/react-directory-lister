import { EventEmitter } from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

var config = require('../../config');

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.directoryList = [];
        this.isLoading = false;
        this.getListDirectory([]);
    }

    getAll() {
        return this.directoryList;
    }

    getLoading() {
        return this.isLoading;
    }

    getListDirectory(path) {
        var stringPath = path.toString();

        // Timeout response not handle yet
        axios({
            url: config.API_SERVER + stringPath,
            timeout: 30000,
            method: 'get',
            responseType: 'json',
        })
            .then(function (response) {
                this.directoryList = response.data.result;
                this.isLoading = false;
                this.emit('change');
            }.bind(this));
    }

    handleActions(action) {
        switch (action.type) {
            case 'GET_LIST_DIRECTORY' : {
                this.getListDirectory(action.path);
                break;
            }
            // Future feature
            case 'SEARCH' : {
                break;
            }
            case 'SORTING' : {
                break;
            }
            default : {
                break;
            }
        }
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;