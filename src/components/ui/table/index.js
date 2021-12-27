import { useMemo, useState } from "react";
import Thead from "./Thead";

const Table = ({columns, data, colOrder, isVisible}) => {

  const colKeys = Object.keys(columns);
  // read the actual state of the data
  const state = useMemo(() => {
    // initialise the grouped object
    const grouped = colKeys.reduce((obj, key) => {
      obj[key] = [];

      return obj;
    }, {});

    // read the actual table data
    const _data = data.map((row) => {
      const _row = {};

      colKeys.forEach((key) => {
        _row[key] = columns[key].getData(row);
        grouped[key].push(_row[key]);
      });

      return _row;
    });

    // get the summary
    const summary = colKeys.reduce((obj, key) => {
      obj[key] = columns[key].getSummary(grouped[key]);

      return obj;
    }, {});

    return {
      data: _data,
      summary,
      grouped
    }
  }, [columns, data]);

  // get the visible columns in the proper order
  const orderedVisibleColumns = colOrder.reduce((arr, key) => {
    if(isVisible[key] === undefined || isVisible[key]) {
      arr.push(key);
    }

    return arr;
  }, [])

  return (
    <div className="table-responsive">
      <table className="table w-100">
        <thead className="fw-normal ">
          <tr>
            {orderedVisibleColumns.map((key) => (
              <Thead
                key={key}
                title={columns[key].title}
                value={columns[key].formatSummary(state.summary[key])}
                align={columns[key].align}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {state.data.map((row, idx) => (
            <tr key={idx}>
              {orderedVisibleColumns.map((key) => (
                <td style={{ textAlign: columns[key].align }} key={key}>
                  {columns[key].formatData(row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.Thead = Thead;

export default Table;