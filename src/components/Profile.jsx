export default function Profile ({ userName, net, income, expense }) {
  return (
    <div
      id='profile'
      className='flex flex-row items-end gap-2 px-1 py-4 border-b-2 border-black'
    >
      <img
        src={null}
        alt=''
        className='w-20 h-20 md:w-25 md:h-25 bg-secondary rounded-full border-2 border-dashed object-center '
      />
      <div className='space-y-1'>
        <h1 className='text-4xl font-semibold'>{userName}</h1>
        <div className='text-xs'>
          <span>
            Net Income:{' '}
            <span className={`text-[${net < 0 ? '#ff0000' : 'black'}]`}>
              {net}
            </span>{' '}
          </span>
          <span>Total Income: {income} </span>
          <span>Total Expense: {expense} </span>
        </div>
      </div>
    </div>
  )
}
