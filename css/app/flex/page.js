export default function page() {
  return (
    <div>
      <div className="flex w-[400px] h-[50px]">
        <div className="flex-shrink basis-[230px] bg-red-600"></div>
        <div className="flex-shrink-[2] basis-[230px] bg-blue-600"></div>
      </div>

      <br />

      <div className="flex w-[500px] h-[50px]">
        <div className="flex-grow basis-[100px] bg-red-600"></div>
        <div className="flex-grow-[2] basis-[100px] bg-blue-600"></div>
      </div>

      <br />

      <div className="flex w-[600px] h-[50px]">
        <div className="w-[150px] flex-grow basis-0 bg-red-600"></div>
        <div className="w-[150px] flex-grow-[2] basis-0 bg-blue-600"></div>
      </div>

      <br />

      <div className="flex w-[600px] h-[50px]">
        <div className="w-[150px] basis-auto flex-grow bg-red-600"></div>
        <div className="w-[150px] basis-auto flex-grow-[2] bg-blue-600"></div>
      </div>
    </div>
  )
}
