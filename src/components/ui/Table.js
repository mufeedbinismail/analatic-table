import { IoFunnelSharp } from "react-icons/io5";

const Table = ({columns, data, filters}) => {

  return (
    <div className="table-responsive">
      <table className="table w-100">
        <thead className="fw-normal ">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                <div className="fw-normal">
                  <IoFunnelSharp />
                  <br />
                  <span>{col.title}</span>
                  <br />
                  <span className="fs-5">7</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>14-Jul-2021</td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;