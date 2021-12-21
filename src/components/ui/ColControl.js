import { Draggable } from "react-beautiful-dnd";
import { classNames } from "../../utils";

const ColControl = ({ text, id, index, ...props }) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => {
      const classes = classNames(props.className, {
        "col-control": true,
        "is-dragging": snapshot.isDragging,
        "un-hidable": props.active === undefined,
        active: props.active,
      });

      return (
        <div
          ref={provided.innerRef}
          data-key={id}
          onClick={props.onClick}
          className={classes}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      );
    }}
  </Draggable>
);

export default ColControl;
