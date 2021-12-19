import * as actionType from './types';

export const toggleVisibility = dispatch => event => (
    dispatch({
        type: actionType.CHANGED_COL_VISIBILITY,
        payload: {
            key: event.currentTarget.dataset.key
        }
    })
);