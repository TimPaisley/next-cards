import { useDroppable } from '@dnd-kit/core'

export default function Discard() {
  const { setNodeRef } = useDroppable({
    id: 'void'
  })

  return (
    <div
      ref={setNodeRef}
      className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-white">
      Drop here to discard
    </div>
  )
}
