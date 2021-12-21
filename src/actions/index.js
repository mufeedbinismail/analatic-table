import * as actionType from './types';

export const toggleVisibility = dispatch => event => (
    event.defaultPrevented || dispatch({
        type: actionType.CHANGED_COL_VISIBILITY,
        payload: {
            key: event.currentTarget.dataset.key
        }
    })
);

export const setColumnOrder = dispatch => order => (
    dispatch({
        type: actionType.CHANGED_COL_ORDER,
        payload: {order}
    })
);