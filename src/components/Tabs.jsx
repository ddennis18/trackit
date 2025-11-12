export default function Tabs ({ tabList }) {
  return (
    <div className='tab-container'>
      {tabList.map(t => {
        return <span className='tab'>{t}</span>
      })}
    </div>
  )
}