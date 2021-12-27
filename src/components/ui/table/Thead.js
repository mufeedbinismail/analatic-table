import { IoFunnelSharp } from "react-icons/io5";

const Thead = ({title, value, ...props}) => (
  <th style={{textAlign: props.align}}>
    <div className="fw-normal">
      <IoFunnelSharp />
      <br />
      <span>{title}</span>
      <br />
      <span className="fs-5">{value}</span>
    </div>
  </th>
);

export default Thead;