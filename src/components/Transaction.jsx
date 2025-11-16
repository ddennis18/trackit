export default function Transaction ({ type, amount, timeStamp, category }) {
  return (
    <div className='border-gray-500 border-b-1 grid grid-cols-5 gap-4 text-xs items-end font-semibold px-2 hover:bg-gray-100'>
      <span className={`text-${type === 'exp' ? 'red' : 'green'}-500`}>
        {type}
      </span>
      <span className=''>$ {amount}</span>
      <span>
        <span className='font-normal'>
          {type === 'exp' ? 'Spent on: ' : 'Source: '}
        </span>{' '}
        {category}
      </span>
      <button className='bg-gray-200 w-min px-4 py-1 hover:bg-gray-400'>
        Details
      </button>
      <span className='font-normal text-right'>{timeStamp}</span>
    </div>
  )
}
