import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    height: '18px',
    margin: '5px',
    backgroundColor: 'white',
    fontSize: '12px',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        console.log('child begin drag');

        props.setSourceDrag('child');

        props.setChildDragSource(props.index);
        return {
            id: props.id,
        };
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId && props.sourceDrag == 'child') {
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
      </div>));
    }
}

const DropDragChrildren = DropTarget('div', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(
  DragSource('div', cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
  }))(Card),
);

export default DropDragChrildren;
