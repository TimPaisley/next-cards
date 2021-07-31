import { Draggable, Droppable } from 'react-beautiful-dnd'

import Card from './card'

export default function Row({ disabled, droppableId, cards }) {
  const getStyle = (style, snapshot) => {
    // Dragging over discard zone
    if (!snapshot.isDropAnimating && snapshot.draggingOver === 'discard') {
      return {
        ...style,
        opacity: 0.5
      }
    }

    // Dropping into discard zone
    else if (snapshot.isDropAnimating && snapshot.draggingOver === 'discard') {
      return {
        ...style,
        visibility: 'hidden'
      }
    }

    // No style change
    else {
      return style
    }
  }

  return (
    <Droppable isDropDisabled={disabled} droppableId={droppableId} direction="horizontal">
      {(provided) => (
        <div className="flex mb-2" ref={provided.innerRef} {...provided.droppableProps}>
          {cards.map((card, i) => (
            <Draggable key={card.id} draggableId={card.id} index={i}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getStyle(provided.draggableProps.style, snapshot)}>
                  <Card card={card} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
