export default function Transaction ({ type, amount, timeStamp, tags }) {
  return (
    <div className='txn'>
      <span style={{ color: type === 'exp' ? 'red' : 'green' }}>{type}</span>
      <span>{amount}</span>
      <span>{tags.map((t)=>{
        return <span className="txn-tag">{t}</span>
      })}</span>
      <button>Details</button>
      <span>{timeStamp}</span>
    </div>
  )
}
