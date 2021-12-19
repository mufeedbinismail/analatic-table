import { classNames } from "../../utils";

const ColControl = ({ text, key, ...props }) => {

const classes = classNames(
    props.className,
    {
        'col-control': true,
        'active': props.active
    }
)

  return <button value={key} onClick={props.onClick} className={classes}>{text}</button>;
};

export default ColControl;