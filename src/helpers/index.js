import React, { useCallback, useMemo } from "react";
import { IoPieChartOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

import {
  formatDate,
  formatCurrency,
  formatPercentage,
  suffixNumber
} from './formatters';
import {
  sum,
  avg,
  count
} from './aggregates';
import { invert, isDate } from "../utils";

const initialColOrder = [
  'date',
  'appName',
  'requests',
  'responses',
  'impressions',
  'clicks',
  'revenue',
  'fillRate',
  'ctr'
];
const initialColVisibility = {
  requests: true,
  responses: false,
  revenue: true,
  fillRate: true,
  impressions: false,
  clicks: true,
  ctr: true
}
const initialFilters = {
  startDate: '2021-05-01',
  endDate: '2021-05-03',
  colOrder: Array.from(initialColOrder),
  isVisible: {...initialColVisibility}
}

const colOrderMap = Array.from(initialColOrder)
.reduce(
  (acc, value, index) => ({...acc, [value]: index.toString(36)}),
  {}
);
const colVisibilityMap = Object.keys(initialColVisibility)
.reduce(
  (acc, value, index) => ({...acc, [value]: 1 << index}),
  {}
)


const getColumnConfigurer = (apps) => {
  return () => ({
    date: {
      title: "Date",
      getData: (row) => row.date,
      formatData: formatDate,
      getSummary: count,
      formatSummary: suffixNumber,
    },
    appName: {
      title: "App",
      getData: (row) => apps.find((app) => app.app_id == row.app_id)?.app_name,
      formatData: (data) => (
        <span>
          <IoPieChartOutline color="orange" size="1.25rem" className="me-2" />
          {data}
        </span>
      ),
      getSummary: count,
      formatSummary: suffixNumber,
    },
    requests: {
      title: "Request",
      getData: (row) => row.requests,
      formatData: suffixNumber,
      getSummary: sum,
      formatSummary: suffixNumber,
    },
    responses: {
      title: "Response",
      getData: (row) => row.responses,
      formatData: suffixNumber,
      getSummary: sum,
      formatSummary: suffixNumber,
    },
    revenue: {
      title: "Revenue",
      getData: (row) => row.revenue,
      formatData: formatCurrency,
      getSummary: sum,
      formatSummary: formatCurrency,
    },
    fillRate: {
      title: "Fill Rate",
      getData: (row) => row.requests / row.responses,
      formatData: formatPercentage,
      getSummary: avg,
      formatSummary: formatPercentage,
    },
    impressions: {
      title: "Impressions",
      getData: (row) => row.impressions,
      formatData: suffixNumber,
      getSummary: sum,
      formatSummary: suffixNumber,
    },
    clicks: {
      title: "Clicks",
      getData: (row) => row.clicks,
      formatData: suffixNumber,
      getSummary: sum,
      formatSummary: suffixNumber,
    },
    ctr: {
      title: "CTR",
      getData: (row) => row.clicks / row.impressions,
      formatData: formatPercentage,
      getSummary: sum,
      formatSummary: formatPercentage,
    },
  });
};

const flattenFilters = (filters) => {
  const _filters = {};

  _filters.startDate = filters.startDate;
  _filters.endDate = filters.endDate;
  _filters.colOrder = filters.colOrder.reduce((acc, col) => (acc + colOrderMap[col]), "");

  const isVisible = Object.keys(initialColVisibility)
    .filter((col) => (filters.isVisible[col]))
    .reduce((acc, col) => (acc | colVisibilityMap[col]), 0);
  _filters.colVisible = String(isVisible);

  return _filters;
};

const bloatFilters = (filters) => {
  const _filters = {};

  _filters.startDate = isDate(filters.startDate)
    ? filters.startDate
    : initialFilters.startDate;

  _filters.endDate = isDate(filters.endDate)
    ? filters.endDate
    : initialFilters.endDate;

  const _colOrderMap = invert(colOrderMap);
  let _colOrder = null;
  if (filters.colOrder) {
    _colOrder = Array.from(filters.colOrder).reduce((acc, key) => {
      if (_colOrderMap[key] === undefined || acc === false) {
        return false;
      }
      acc.push(_colOrderMap[key]);
      return acc;
    }, []);
  }

  _filters.colOrder = _colOrder || initialFilters.colOrder;

  const colVisibility = Number(filters.colVisible);
  let isVisible = null;
  if (!isNaN(colVisibility) && colVisibility > 0) {
    isVisible = Object.keys(initialColVisibility).reduce((acc, col) => {
      acc[col] =
        initialColVisibility[col] !== undefined &&
        (colVisibility & colVisibilityMap[col]) === colVisibilityMap[col];
      return acc;
    }, {});
  }

  _filters.isVisible = isVisible || initialFilters.isVisible;

  return _filters;
};

const composeReducer = (reducerOne, reducerTwo) => (state, action) =>
  reducerTwo(reducerOne(state, action), action);

/**
 * A Custom hook to transform the filters when reading from or writing to query string
 *
 * @returns {Array} An array containing a reference to the value and a function to set the value
 */
const useFilterQueryParam = () => {
  let [filterParams, setFilterParams] = useSearchParams();
  let params = {};

  ["startDate", "endDate", "colOrder", "colVisible"].forEach((val) => {
    params[val] = filterParams.get(val);
  });

  let value = useMemo(() => bloatFilters(params), [params]);

  /**
   * Sets the new value to the search params
   *
   * @param {any} newValue
   * @param {{replace: boolean, state: any}} options
   *
   * @returns void
   */
  let setValue = useCallback(
    (newFilters, options) => {
      let _newFilters = flattenFilters(newFilters);
      _newFilters = new URLSearchParams(_newFilters);
      setFilterParams(_newFilters, options);
    },
    [filterParams, setFilterParams]
  );

  return [value, setValue];
};

export { getColumnConfigurer, composeReducer, useFilterQueryParam };