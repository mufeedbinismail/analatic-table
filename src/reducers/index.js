import * as actionType from "../actions/types";

const reducers = (filters, action) => {
  switch (action.type) {
    case actionType.CHANGED_DATE:
      return {
        ...filters,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case actionType.CHANGED_COL_VISIBILITY:
      const isVisible = {...filters.isVisible};
      if (isVisible[action.payload.key] !== undefined) {
          isVisible[action.payload.key] = !isVisible[action.payload.key];
      }
      return {
        ...filters,
        isVisible,
      };

    case actionType.CHANGED_COL_ORDER:
      const order = filters.payload.order;
      return {
        ...filters,
        order,
      };

    default:
      return filters; 
  }
};

export default reducers;