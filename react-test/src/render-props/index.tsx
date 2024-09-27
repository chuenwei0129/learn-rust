import RowList from './RowList'

export default function RenderProps() {
  return (
    <div>
      <RowList
        renderItem={(item) => (
          <div style={{ color: 'yellowgreen' }}>{item.content}</div>
        )}
        items={[
          {
            id: 1,
            content: <div>111</div>,
          },
          {
            id: 2,
            content: <div>222</div>,
          },
          {
            id: 3,
            content: <div>333</div>,
          },
        ]}
      ></RowList>
    </div>
  )
}
