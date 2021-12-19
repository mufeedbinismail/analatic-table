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
      const visibility = {...filters.visibility};
      if (visibility[action.payload.key] !== undefined) {
          visibility[action.payload.key] = !visibility[action.payload.key];
      }
      return {
        ...filters,
        visibility,
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