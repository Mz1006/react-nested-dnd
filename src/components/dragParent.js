import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        console.log('parent begin drag');
        props.setSourceDrag('parent');

        props.setIsDraging(true, props.id);
        return {
            id: props.id,
        };
    },
    endDrag(props) {
        props.setIsDraging(false);
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId && props.sourceDrag == 'parent') {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    },
};

class Card extends Component {
    render() {
        const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }}>
        {text}
        {this.props.childrenD}
      </div>));
    }
}

const DropDrag = DropTarget('div', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(
  DragSource('div', cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
  }))(Card),
);

export default DropDrag;
