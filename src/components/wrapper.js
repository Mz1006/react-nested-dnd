import React, { Component } from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropDrag from './dragParent';
import DragDropC from './dragChildren';

const style = {
    width: 300,
    overflow: 'hidden',
    overflowY: 'auto',
};

const cardTarget = {
    drop() {},
};

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sourceDrag: null,
            iChildDragSource: null,
            cardp: [
                {
                    id: 1,
                    text: 'parent 1',
                },
                {
                    id: 2,
                    text: 'parent 2',
                },
                {
                    id: 3,
                    text: 'parent 3',
                },
                {
                    id: 4,
                    text: 'parent 4',
                },
                {
                    id: 5,
                    text: 'parent 5',
                },
                {
                    id: 6,
                    text: 'parent 6',
                },
            ],
            cards: [
                {
                    id: 1,
                    text: 'children 1',
                },
                {
                    id: 2,
                    text: 'children 2',
                },
                {
                    id: 3,
                    text: 'children 3',
                },
                {
                    id: 4,
                    text: 'children 4',
                },
                {
                    id: 5,
                    text: 'children 5',
                },
                {
                    id: 6,
                    text: 'children 6',
                },
            ],
        };
    }

    setSourceDrag = (value) => {
        this.setState({
            sourceDrag: value,
        });
    }

    setIsDraging = (value, index) => {
        this.setState({
            isDraging: value,
            idDragingIndex: index,
        });
    }

    setChildDragSource = (value) => {
        this.setState({
            iChildDragSource: value,
        });
    }

    setChildDragSource = (value) => {
        this.setState({
            iChildDragSource: value,
        });
    }

    moveCard = (id, atIndex) => {
        const { card, index } = this.findCard(id);
        const newstate = update(this.state, { cardp: { $splice: [[index, 1], [atIndex, 0, card]] } });
        this.setState(newstate);
    }

    findCard = (id) => {
        const { cardp } = this.state;
        const card = cardp.filter(c => c.id === id)[0];
        return {
            card,
            index: cardp.indexOf(card),
        };
    }

    childrenMoveCard = (id, atIndex) => {
        const { card, index } = this.childrenFindCard(id);
        const newstate = update(this.state, { cards: { $splice: [[index, 1], [atIndex, 0, card]] } });
        this.setState(newstate);
    }

    childrenFindCard = (id) => {
        const { cards } = this.state;
        const card = cards.filter(c => c.id === id)[0];
        return {
            card,
            index: cards.indexOf(card),
        };
    }


    render() {
        const { connectDropTarget } = this.props;
        const { cardp, cards } = this.state;

        const DragChildren = (connectDropTarget(<div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cards.map(card => (
            <DragDropC
              key={card.id}
              id={card.id}
              text={card.text}
              moveCard={this.childrenMoveCard}
              findCard={this.childrenFindCard}
              sourceDrag={this.state.sourceDrag}
              setSourceDrag={this.setSourceDrag}
              iChildDragSource={this.state.iChildDragSource}
              setChildDragSource={this.setChildDragSource}
            />),
    )}
        </div>));
        return connectDropTarget(
          <div style={style}>
            {
             cardp.map(item => (
               <DropDrag
                 key={item.id}
                 id={item.id}
                 text={item.text}
                 parentIndex={item.id}
                 childrenD={DragChildren}
                 moveCard={this.moveCard}
                 findCard={this.findCard}
                 sourceDrag={this.state.sourceDrag}
                 setSourceDrag={this.setSourceDrag}
                 setIsDraging={this.setIsDraging}
               />
             ))
           }
          </div>);
    }
}

const ContainerList = DragDropContext(HTML5Backend)(
  DropTarget('div', cardTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
  }))(Container),
);


export default ContainerList;
