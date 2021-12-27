import { FaCalendarAlt } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import { useState, useMemo, useEffect, useReducer } from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import "./scss/app.scss";
import * as api from './api';
import * as actions from './actions';
import reducers from './reducers';
import useIconContextProvider from "./hooks/useIconContextProvider";
import useFilterQueryParam from "./hooks/useFilterQueryParam";
import Layout from "./components/ui/Layout";
import ClearFix from "./components/ui/ClearFix";
import ButtonBadge from "./components/ui/ButtonBadge";
import Collapse from "./components/ui/Collapse";
import ColControl from "./components/ui/ColControl";
import Table from "./components/ui/table";
import DateRangeFilterForm from "./components/ui/DateRangeFilterForm";
import {
  getColumnConfiguration,
  composeReducer,
  cloneFilters
} from "./helpers";
import { formatDateRange } from './helpers/formatters';
import { reorderArray } from './utils';
import useToggle from "./hooks/useToggle";

function App() {
  const IconContextProvider = useIconContextProvider({
    className: "text-primary me-2 mb-1",
    size: "1.25rem",
  });

  const [filtersFromQuery, setFilters] = useFilterQueryParam();
  const composedReducers = composeReducer(
    reducers,
    (filters, actions) => {
      setFilters(cloneFilters(filters), {
        replace: true,
        state: {}
      });
      return filters;
    }
  );

  const [isOptionsExpanded, toggleOptions] = useToggle(false);
  const [isDateRangeExpanded, toggleDateRange] = useToggle(false);
  const [apps, setApps] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [filters, dispatch] = useReducer(composedReducers, filtersFromQuery);

  useEffect(() => {
    api
      .getApps()
      .then((res) => setApps(res.data))
      .catch((err) => console.log(err));

    api
      .getReport(filters.startDate, filters.endDate)
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.log(err));
  }, [filters.startDate, filters.endDate]);

  const columns = useMemo(() => getColumnConfiguration(apps), [apps]);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newOrder = reorderArray(
      filters.colOrder,
      draggableId,
      source.index,
      destination.index
    );

    actions.setColumnOrder(dispatch)(newOrder);
  };

  return (
    <Layout>
      <h1 className="mb-5">Analytics</h1>

      <IconContextProvider>
        <ClearFix>
          <ButtonBadge
            icon={<FaCalendarAlt />}
            float="start"
            text={formatDateRange(filters.startDate, filters.endDate)}
            onClick={toggleDateRange}
          />

          <ButtonBadge
            icon={<IoOptions />}
            float="end"
            text={"Settings"}
            onClick={toggleOptions}
          />
        </ClearFix>
        <Collapse visible={isDateRangeExpanded}>
          <DateRangeFilterForm
            dispatch={dispatch}
            startDate={filters.startDate}
            endDate={filters.endDate} />
        </Collapse>
        <DragDropContext onDragEnd={onDragEnd}>
          <Collapse
            visible={isOptionsExpanded}
            className="mb-4 p-3 rounded border overflow-hidden"
          >
            <h4 className="mb-3">Dimensions and Metrics</h4>

            <Droppable droppableId="droppableDiv" direction="horizontal">
              {(provided) => (
                <ol
                  className="list-inline d-flex flex-row"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filters.colOrder.map((key, index) => {
                    const { title } = columns[key];

                    return (
                      <ColControl
                        className="list-inline-item"
                        text={title}
                        key={key}
                        id={key}
                        index={index}
                        onClick={actions.toggleVisibility(dispatch)}
                        active={filters.isVisible[key]}
                      />
                    );
                  })}
                  <span className="w-0">{provided.placeholder}</span>
                </ol>
              )}
            </Droppable>
          </Collapse>
        </DragDropContext>
      </IconContextProvider>

      <Table
        columns={columns}
        colOrder={filters.colOrder}
        isVisible={filters.isVisible}
        data={analytics}
      />
    </Layout>
  );
}

export default App;
