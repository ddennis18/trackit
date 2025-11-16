export default function Profile (props) {
  return (
    <div
      id='profile'
      className='flex flex-row items-start gap-4 px-2 py-4 border-b-2 border-black'
    >
      <img
        src={null}
        alt=''
        className='w-25 h-25 bg-gray-200 rounded-full border-2 border-dashed object-center'
      />
      <div className='space-y-4'>
        <h1 className='text-4xl font-semibold'>{props.userName}</h1>
        <div>
          <span>Net Income: {props.net}</span>
          <span>Total Income: {props.income}</span>
          <span>Total Expense: {props.expense}</span>
        </div>
      </div>
    </div>
  )
}