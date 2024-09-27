export default function Error() {
  console.log('🚀 ~ Error ~ Error:')
  //@ts-expect-error
  const x = window.x.y
  return <div>{x}</div>
}
