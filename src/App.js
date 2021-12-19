import { FaCalendarAlt } from "react-icons/fa";
import { IoOptions, IoPieChartOutline } from "react-icons/io5";
import { useState, useMemo, useEffect, useReducer } from "react";

import "./scss/app.scss";
import * as api from './api';
import * as actionType from './actions/types';
import * as actions from './actions';
import reducers from './reducers';
import useIconContextProvider from "./hooks/useIconContextProvider";
import Layout from "./components/ui/Layout";
import ClearFix from "./components/ui/ClearFix";
import ButtonBadge from "./components/ui/ButtonBadge";
import Collapse from "./components/ui/Collapse";
import ColControl from "./components/ui/ColControl";
import Table from "./components/ui/table";

function App() {

  const IconContextProvider = useIconContextProvider({
    className: "text-primary me-2 mb-1",
    size: "1.25rem"
  })

  const [reload, setReload] = useState(0);
  const [optionsExpanded, setOptionsExpanded] = useState(false);
  const [apps, setApps] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [filters, dispatch] = useReducer(reducers, {
    startDate: '2021-05-01',
    endDate: '2021-05-03',
    order: [
      'date',
      'app_name',
      'requests',
      'responses',
      'impressions',
      'clicks',
      'revenue',
      'fill_rate',
      'ctr'
    ],
    isVisible: {
      'requests': true,
      'responses': false,
      'revenue': true,
      'fill_rate': true,
      'impressions': false,
      'clicks': true,
      'ctr': true
    }
  })

  const toggleOptions = () => {
    setOptionsExpanded(!optionsExpanded);
  }

  useEffect(() => {
    api.getApps()
    .then(res => setApps(res.data))
    .catch(err => console.log(err));

    api.getReport(filters.startDate, filters.endDate)
      .then(res => setAnalytics(res.data))
      .catch(err => console.log(err));
  }, [reload]);

  const columns = useMemo(() => {
    const formatters = {
      formatDate: (
        new Intl.DateTimeFormat(
          'en-GB',
          {day: 'numeric', month: 'long', year: 'numeric'}
        )
      ),
      formatCurrency: (
        new Intl.NumberFormat(
          'en-US',
          {style: 'currency', currency: 'USD', maximumFractionDigits: 2}
        )
      ).format,
      formatPercentage: (
        new Intl.NumberFormat(
          'en-US',
          {style : 'percent', maximumFractionDigits: 2}
        )
      ).format,
      formatCount: number => {
        let _number = "" + number;
        if (number >= 1000) {
            const suffixes = ["", "K", "M", "B", "T"];
            const suffixNum = Math.floor(("" + number).length / 3);
            
            let shortValue = 0;
            for (let precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat(
                  (suffixNum != 0
                    ? (number / Math.pow(1000,suffixNum))
                    : number
                  ).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }

            _number = (shortValue % 1 != 0 ? shortValue.toFixed(1) : shortValue) + suffixes[suffixNum];
        }
        return _number;
    }
    }

    const aggregate = {};
    aggregate['count'] = arr => (arr.length || 0);
    aggregate['sum'] = arr => (arr.reduce((prev, curr) => (prev + curr), 0));
    aggregate['avg'] = arr => (aggregate.sum(arr) / (aggregate.count(arr) + 1));

    return (
      [
        {
          key: 'date',
          title: 'Date',
          getData: row => row.date,
          formatData: data => {
            const dt = new Date(data);
            return formatters.formatDate
              .formatToParts(dt)
              .map(({type, value}) => type == 'literal' ? '-' : value)
              .join('');
          },
          getSummary: aggregate.count,
          formatSummary: formatters.formatCount
        },
        {
          key: 'app_name',
          title: 'App',
          getData: row => apps.find(app => app.app_id == row.app_id)?.app_name,
          formatData: data => (<span><IoPieChartOutline color="orange" size="1.25rem" className="me-2"/>{data}</span>),
          getSummary: aggregate.count,
          formatSummary: formatters.formatCount
        },
        {
          key: 'requests',
          title: 'Request',
          getData: row => row.requests,
          formatData: formatters.formatCount,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatCount
        },
        {
          key: 'responses',
          title: 'Response',
          getData: row => row.responses,
          formatData: formatters.formatCount,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatCount
        },
        {
          key: 'revenue',
          title: 'Revenue',
          getData: row => row.revenue,
          formatData: formatters.formatCurrency,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatCurrency
        },
        {
          key: 'fill_rate',
          title: 'Fill Rate',
          getData: row => (row.requests / row.responses),
          formatData: formatters.formatPercentage,
          getSummary: aggregate.avg,
          formatSummary: formatters.formatPercentage
        },
        {
          key: 'impressions',
          title: 'Impressions',
          getData: row => row.impressions,
          formatData: formatters.formatCount,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatCount
        },
        {
          key: 'clicks',
          title: 'Clicks',
          getData: row => row.clicks,
          formatData: formatters.formatCount,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatCount
        },
        {
          key: 'ctr',
          title: 'CTR',
          getData: row => (row.clicks / row.impressions),
          formatData: formatters.formatPercentage,
          getSummary: aggregate.sum,
          formatSummary: formatters.formatPercentage
        },
      ]
    )
  }, [apps]);

  return (
    <Layout>
      <h1 className="mb-5">Analytics</h1>
      
      <IconContextProvider>
        <ClearFix>
          <ButtonBadge icon={<FaCalendarAlt/>} float="start" text={"jul 08 - Jul 14, 2021"} onClick={() => setReload(reload + 1)}/>
          <ButtonBadge icon={<IoOptions/>} float="end" text={"Settings"} onClick={toggleOptions} />
        </ClearFix>

        <Collapse visible={optionsExpanded} className="mb-4 p-3 rounded border">
          <h4 className="mb-3">Dimensions and Metrics</h4>
          {columns.map(({title, key}) => (
            <ColControl
              text={title}
              key={key}
              id={key}
              onClick={actions.toggleVisibility(dispatch)}
              active={undefined === filters.isVisible[key] || filters.isVisible[key]} />
          ))}
        </Collapse>
      </IconContextProvider>

      <Table columns={columns} filters={filters} data={analytics} />
      
    </Layout>
  );
}

export default App;
