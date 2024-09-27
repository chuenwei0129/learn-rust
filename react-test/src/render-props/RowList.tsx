import { FC, PropsWithChildren, ReactNode } from 'react'

interface RowListProps extends PropsWithChildren {
  items: { id: number; content: ReactNode }[]
  renderItem: (item: { id: number; content: ReactNode }) => ReactNode
}

const RowList: FC<RowListProps> = ({ items, renderItem }) => {
  return (
    <div>
      {items.map((item) => {
        return renderItem(item)
      })}
    </div>
  )
}

export default RowList
