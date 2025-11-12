import { useState } from 'react'

import Profile from './components/Profile.jsx'
import Transaction from './components/Transaction.jsx'
import Tabs from './components/Tabs.jsx'
import './css/style.css'

const transactions = [
  {
    type: 'exp',
    timeStamp: '00/f/f/',
    amount: 100,
    description: 'j',
    tags: ['dsd']
  }
]

let expenseTags = ['food', 'woman', 'internet', 'rent']
let incomeTags = ['loan', 'friend', 'gift', 'scholarship', 'parent']

function NewTxnModal () {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')
  return (
    <div className='modalOverlay'>
      <div>
        <form id='newTxnForm'>
          <label htmlFor='txnType'>Transaction Type</label>
          <select
            name='txnType'
            id='txnType'
            onChange={event => {
              setSelectedTxnType(event.target.value)
            }}
          >
            <option value='exp'>Expense</option>
            <option value='inc'>Income</option>
          </select>
          <label htmlFor='amount'>Amount</label>
          <input type='number' name='amount' id='amount' />
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='decription'
            placeholder='Enter Description...'
          ></textarea>
          <label htmlFor='txnTags'>Transaction Type</label>
          <select name='txnTags' id='txnTags'>
            {(selectedTxnType === 'exp' ? expenseTags : incomeTags).map(t => {
              return <option>{t}</option>
            })}
          </select>
        </form>
      </div>
    </div>
  )
}

function App () {
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)

  return (
    <div>
      <Profile userName='jjd' />
      <div className='control-btns'>
        <button
          className='add-txn-btn'
          onClick={() => setAddTxnModalIsopen(true)}
        >
          Add Txn
        </button>
        <button
          className='manageTagsBtn'
        >
          Add Tag
        </button>
      </div>
      <div className='txns'>
        <Tabs tabList={['All', 'Expenses', 'Income']} />
        <div>
          {transactions.map(txn => {
            return <Transaction {...txn} />
          })}
        </div>
      </div>
      {addTxnModalIsopen && <NewTxnModal />}
    </div>
  )
}

export default App
