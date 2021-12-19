import {classNames} from '../../utils';

const ButtonBadge = ({icon, text, float, ...props}) => {
    const classes = classNames(
        props.className,
        {
          'btn': true,
          'border': true,
          'float-start': float == 'start',
          'float-end': float == 'end'
        }
    );

    return (
      <button className={classes} onClick={props.onClick}>
        {icon}
        <span>{text}</span>
      </button>
    );
}

export default ButtonBadge;