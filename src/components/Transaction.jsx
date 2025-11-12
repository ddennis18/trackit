export default function Transaction ({ type, amount, timeStamp, category }) {
  return (
    <div className='txn'>
      <span style={{ color: type === 'exp' ? 'red' : 'green' }}>{type}</span>
      <span>{amount}</span>
      <span>{category}</span>
      <button>Details</button>
      <span>{timeStamp}</span>
    </div>
  )
}
