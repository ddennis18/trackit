import { useState } from 'react'
import Modal from './Modal.jsx'

export default function Transaction ({
  type,
  amount,
  timeStamp,
  category,
  onDelete,
  description
}) {
  {
    /*<div className=' flex flex-row justify-between gap-1  items-end font-semibold px-2 '>*/
  }

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='border-gray-500 border-b-1 grid grid-cols-4 md:grid-cols-6 text-xs items-center px-2 hover:bg-gray-100'>
      <span
        className={`text-${type === 'expense' ? '[#ff0000]' : '[#00ff00]'}`}
      >
        {type}
      </span>
      <span className=''>$ {amount}</span>
      <span>
        <span className='font-normal'>
          {type === 'expense' ? 'Spent on: ' : 'Source: '}
        </span>{' '}
        {category}
      </span>
      <span className='font-normal text-right'>{timeStamp}</span>
      <span className='md:hidden'></span>
      <span className='md:hidden'></span>
      <button
        className='w-min ml-[auto] px-4 py-1 hover:bg-gray-400'
        onClick={() => setIsExpanded(true)}
      >
        Details
      </button>
      <button
        className='text-[#ff0000] w-min ml-[auto] px-4 py-1 bg-gray-200 hover:bg-gray-400'
        onClick={onDelete}
      >
        Delete
      </button>

      {/*Expanded details modal*/}
      {isExpanded && (
        <Modal>
          <div className='bg-background p-4 rounded-xl flex flex-col gap-2 shadow-xl min-w-[300px] text-sm'>
            <button
              className='hover:bg-gray-200 rounded-full px-2 text-xl self-end'
              onClick={() => setIsExpanded(false)}
            >
              ×
            </button>
            <p>
              <b>Type:</b>{' '}
              <span
                className={`text-${
                  type === 'expense' ? '[#ff0000]' : '[#00ff00]'
                }`}
              >
                {type}
              </span>
            </p>
            <p>
              <b>Amount:</b> ${amount}
            </p>
            <p>
              <b>{type === 'expense' ? 'Spent On: ' : 'Source: '}</b>
              {category}
            </p>
            <p>
              <b>Details:</b>
            </p>
            <p className='border-gray-200 border-1 p-2'>{description}</p>
            <p>
              <b>Date:</b> {timeStamp.split('T')[0]}
            </p>
            <p>
              <b>Time:</b> {timeStamp.split('T')[1]}
            </p>
            <button
              className='bg-[#ff0000] font-semibold text-white rounded-lg py-2 px-4 self-center'
              onClick={() => {
                onDelete()
                setIsExpanded(false)
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
