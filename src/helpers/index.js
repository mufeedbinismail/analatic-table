import React from "react";
import { IoPieChartOutline } from "react-icons/io5";

// aggregate funtions
const sum = arr => arr.reduce((prev, curr) => (prev + curr), 0);
const count = arr => (arr.length || 0);
const avg = arr => sum(arr) / (count(arr) + 1);

// formatters
const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
}).format;

const formatPercentage = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}).format;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const formatDate = (dateString) => {
  const dt = new Date(dateString);
  return dateFormatter
    .formatToParts(dt)
    .map(({ type, value }) => (type == "literal" ? "-" : value))
    .join("");
};

const formatDateRange = (startDate, endDate) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const startDateParts = dateFormatter.formatToParts(new Date(startDate));
  const endDateParts = dateFormatter.formatToParts(new Date(endDate));

  return `${startDateParts[0].value} ${startDateParts[2].value} - ${endDateParts[0].value} ${endDateParts[2].value}, ${endDateParts[4].value}`;
}

const suffixNumber = (number) => {
  let _number = "" + number;
  if (number >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(("" + number).length / 3);

    let shortValue = 0;
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? number / Math.pow(1000, suffixNum)
          : number
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }

    _number =
      (shortValue % 1 != 0 ? shortValue.toFixed(1) : shortValue) +
      suffixes[suffixNum];
  }
  return _number;
};

const initialFilters = {
  startDate: '2021-05-01',
  endDate: '2021-05-03',
  colOrder: [
    'date',
    'appName',
    'requests',
    'responses',
    'impressions',
    'clicks',
    'revenue',
    'fillRate',
    'ctr'
  ],
  isVisible: {
    requests: true,
    responses: false,
    revenue: true,
    fillRate: true,
    impressions: false,
    clicks: true,
    ctr: true
  }
}

const reorderArray = (arr, item, source, dest) => {
  const newArr = Array.from(arr);
  newArr.splice(source, 1);
  newArr.splice(dest, 0, item);

  return newArr;
}

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
}

export {initialFilters, getColumnConfigurer, formatDateRange, reorderArray}