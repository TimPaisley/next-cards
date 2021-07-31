import { Droppable } from 'react-beautiful-dnd'

export default function Discard({ disabled }) {
  return (
    <Droppable isDropDisabled={disabled} droppableId="discard">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`absolute top-0 left-0 w-full h-full ${disabled ? 'invisible' : ''}`}>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
