import dispatcher from '../dispatcher';

export function getListDirectory(path) {
    dispatcher.dispatch({
        type: 'GET_LIST_DIRECTORY',
        path,
    });
}

// Not implemented yet
export function search(keyword) {
    dispatcher.dispatch({
        type: 'SEARCH',
        keyword,
    });
}

// Not implemented yet
export function sorting(keyword) {
    dispatcher.dispatch({
        type: 'SORTING',
        keyword,
    });
}
