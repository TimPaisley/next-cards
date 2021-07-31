import { Draggable, Droppable } from 'react-beautiful-dnd'

import Card from './card'

export default function Row({ disabled, droppableId, cards }) {
  return (
    <Droppable isDropDisabled={disabled} droppableId={droppableId} direction="horizontal">
      {(provided) => (
        <div className="flex mb-2" ref={provided.innerRef} {...provided.droppableProps}>
          {cards.map((card, i) => (
            <Draggable key={card.id} draggableId={card.id} index={i}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
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
