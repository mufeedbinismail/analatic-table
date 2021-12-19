import { classNames } from "../../utils";

const ColControl = ({ text, id, ...props }) => {

const classes = classNames(
    props.className,
    {
        'col-control': true,
        'active': props.active
    }
)

  return <button data-key={id} onClick={props.onClick} className={classes}>{text}</button>;
};

export default ColControl;