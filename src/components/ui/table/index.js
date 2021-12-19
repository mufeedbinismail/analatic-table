import { useMemo, useState } from "react";
import Thead from "./Thead";

const Table = ({columns, data, filters}) => {

  // read the actual state of the data
  const state = useMemo(() => {
    // initialise the grouped object
    const grouped = columns.reduce((obj, {key}) => {
      obj[key] = [];

      return obj;
    }, {});

    // read the actual table data
    const _data = data.map((row) => {
      const _row = {};

      columns.forEach(({key, getData}) => {
        _row[key] = getData(row);
        grouped[key].push(_row[key]);
      });

      return _row;
    });

    // get the summary
    const summary = columns.reduce((obj, {key, getSummary}) => {
      obj[key] = getSummary(grouped[key]);

      return obj;
    }, {});

    return {
      data: _data,
      summary,
      grouped
    }
  }, [columns, data]);

  // index the columns configuration using the key
  const _columns = columns.reduce((obj, col) => {
    obj[col.key] = col;

    return obj;
  }, {});

  // get the visible columns in the proper order
  const orderedVisibleColumns = filters.order.reduce((arr, key) => {
    if(filters.isVisible[key] === undefined || filters.isVisible[key]) {
      arr.push(key);
    }

    return arr;
  }, [])

  return (
    <div className="table-responsive">
      <table className="table w-100">
        <thead className="fw-normal ">
          <tr>
            {orderedVisibleColumns.map(key => (
              <Thead
                key={key}
                title={_columns[key].title}
                value={_columns[key].formatSummary(state.summary[key])} />
            ))}
          </tr>
        </thead>
        <tbody>
          {
            state.data.map((row, idx) => (
              <tr key={idx}>
                {orderedVisibleColumns.map(key => (
                  <td key={key}>{_columns[key].formatData(row[key])}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

Table.Thead = Thead;

export default Table;