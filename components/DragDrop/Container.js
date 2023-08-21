import { SortableContext } from '@dnd-kit/sortable'

import Row from '../Row'
import Item from './Item'
import { strategy } from './Strategy'

export default function Container({ id, highlight = false, items, renderItem, activeId }) {
  return (
    <SortableContext id={id} items={items} strategy={strategy}>
      <Row
        highlight={highlight}
        items={items}
        renderItem={(id) => (
          <Item key={id} itemId={id} renderItem={renderItem} isActive={id === activeId} />
        )}
      />
    </SortableContext>
  )
}
