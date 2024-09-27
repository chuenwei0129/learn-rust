import React from 'react'

export default function Parent({ children }: { children: React.ReactNode }) {
  console.log('API: ', React.Children)
  console.log('🚀 ~ Parent ~ children:', children)

  return (
    <div>
      {/* React.Children.map 会把 children 拍平，而数组的方法不会。 */}
      {React.Children.map(children, (item) => {
        return <div style={{ color: 'blueviolet' }}>{item}</div>
      })}
    </div>
  )
}
