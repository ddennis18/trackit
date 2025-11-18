import { useState } from 'react'

export default function TabSection ({ tabList, contentList, defaultTab = 0 }) {
  const [currentTab, setCurrentTab] = useState(defaultTab)

  return (
    <div className='tab-container'>
      <div className='flex flex-row px-2 '>
        {tabList.map((t, i) => {
          return (
            <button
              className={`border-black border-t-${
                currentTab == i ? '1' : '4'
              } hover:font-semibold border-l-1 border-r-1 px-1 text-${
                currentTab == i ? 'sm' : 'xs'
              } font-${currentTab == i ? 'semibold' : 'normal'}`}
              key={'tab'+t+'-'+i}
              onClick={() => {
                setCurrentTab(i)
              }}
            >
              {t}
            </button>
          )
        })}
      </div>
      {contentList[currentTab]}
    </div>
  )
}
