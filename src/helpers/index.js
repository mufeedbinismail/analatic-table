import { IoPieChartOutline } from "react-icons/io5";

import {
  formatDate,
  formatCurrency,
  formatPercentage,
  suffixNumber,
  formatNumber
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

const getColumnConfiguration = (apps) => ({
  date: {
    title: "Date",
    align: 'left',
    getData: (row) => row.date,
    formatData: formatDate,
    getSummary: count,
    formatSummary: suffixNumber,
  },
  appName: {
    title: "App",
    align: 'left',
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
    align: 'right',
    getData: (row) => row.requests,
    formatData: formatNumber,
    getSummary: sum,
    formatSummary: suffixNumber,
  },
  responses: {
    title: "Response",
    align: 'right',
    getData: (row) => row.responses,
    formatData: formatNumber,
    getSummary: sum,
    formatSummary: suffixNumber,
  },
  revenue: {
    title: "Revenue",
    align: 'right',
    getData: (row) => row.revenue,
    formatData: formatCurrency,
    getSummary: sum,
    formatSummary: formatCurrency,
  },
  fillRate: {
    title: "Fill Rate",
    align: 'right',
    getData: (row) => (row.requests / row.responses),
    formatData: formatPercentage,
    getSummary: avg,
    formatSummary: formatPercentage,
  },
  impressions: {
    title: "Impressions",
    align: 'right',
    getData: (row) => row.impressions,
    formatData: formatNumber,
    getSummary: sum,
    formatSummary: suffixNumber,
  },
  clicks: {
    title: "Clicks",
    align: 'right',
    getData: (row) => row.clicks,
    formatData: formatNumber,
    getSummary: sum,
    formatSummary: suffixNumber,
  },
  ctr: {
    title: "CTR",
    align: 'right',
    getData: (row) => (row.clicks / row.impressions),
    formatData: formatPercentage,
    getSummary: avg,
    formatSummary: formatPercentage,
  },
});

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

const cloneFilters = (filters) => ({
  startDate: filters.startDate,
  endDate: filters.endDate,
  colOrder: Array.from(filters.colOrder),
  isVisible: {...filters.isVisible}
})

const composeReducer = (reducerOne, reducerTwo) => (state, action) =>
  reducerTwo(reducerOne(state, action), action);

export { getColumnConfiguration, composeReducer, bloatFilters, flattenFilters, cloneFilters };