import { useDroppable } from '@dnd-kit/core'

export default function Trash() {
  const { setNodeRef } = useDroppable({
    id: 'void'
  })

  return (
    <div
      ref={setNodeRef}
      className="p-2 mb-2 w-full flex items-center justify-center border border-gray-500">
      Drop here to discard
    </div>
  )
}
