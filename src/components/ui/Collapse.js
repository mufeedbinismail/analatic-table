import { classNames } from '../../utils';

const MyCollapse = ({visible, children, ...props}) => {
  const classes = classNames(
    props.className,
    {
      'collapse': true,
      'show': visible
    }
  );
 return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default MyCollapse;