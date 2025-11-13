import { useState } from 'react'

import Profile from './components/Profile.jsx'
import Transaction from './components/Transaction.jsx'
import Tabs from './components/Tabs.jsx'
import './css/style.css'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

function NewTxnModal ({ onClose, onFinish }) {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')
  const [category, setCategory] = useState(['---'])

  let newTxnData = {
    type: 'exp',
    timeStamp: new Date().toLocaleString(),
    amount: 100,
    description: '',
    category: '---'
  }
  return (
    <div className='modalOverlay'>
      <div>
        <form id='newTxnForm' action='xx.com'>
          <button
            id='closeModalBtn'
            style={{
              fontSize: '1.5rem',
              width: 'min-content',
              padding: '4px',
              backgroundColor: '#f0f0f0',
              alignSelf: 'flex-end'
            }}
            onClick={e => {
              e.preventDefault()
              onClose()
            }}
          >
            x
          </button>
          <h2>Add A New Transaction!</h2>
          <label htmlFor='txnType'>Transaction Type</label>
          <select
            name='txnType'
            id='txnType'
            onChange={event => {
              newTxnData.type = event.target.value
              setSelectedTxnType(event.target.value)
            }}
          >
            <option value='exp'>Expense</option>
            <option value='inc'>Income</option>
          </select>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            id='amount'
            onChange={e => (newTxnData.amount = e.target.value)}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='decription'
            placeholder='Enter Description...'
            onChange={e => {
              newTxnData.details = e.target.value
            }}
          ></textarea>
          <label htmlFor='txnTags'>Add Category</label>
          <select
            name='txnTags'
            id='txnTags'
            defaultValue='---'
            onChange={events => {
              newTxnData.category = events.target.value
            }}
          >
            {(selectedTxnType === 'exp'
              ? expenseCategories
              : incomeCategories
            ).map(t => {
              return <option value={t}>{t}</option>
            })}
            <option value='---'>{'---'}</option>
          </select>

          <button
            type='submit'
            style={{
              fontWeight: '700',
              color: 'white',
              backgroundColor: 'green',
              padding: '8px',
              width: 'max-content',
              borderRadius: '4px',
              margin: 'auto'
            }}
            onClick={e => {
              e.preventDefault()
              newTxnData.type = selectedTxnType
              onFinish(newTxnData)
              onClose()
            }}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  )
}

function txnFilter (t, { type, cat }) {
  const typeCheck = type === 'all' || t.type === type
  const categoryCheck = cat === '---' || t.category === cat
  return typeCheck && categoryCheck
}

function App () {
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('---')
  const [filterType, setFilterType] = useState('all')
  const [transactions, setTransactions] = useState([])

  return (
    <div>
      <Profile userName='User' />
      <div className='control-btns'>
        <button
          className='add-txn-btn'
          onClick={() => setAddTxnModalIsopen(true)}
        >
          Add Txn
        </button>
        <button className='manageTagsBtn'>Add Tag</button>
      </div>
      <div className='txns'>
        <div className='filter-controls'>
          <label htmlFor='type-filter'>Type: </label>
          <select
            name=''
            id='type-filter'
            defaultValue='all'
            onChange={e => setFilterType(e.target.value)}
          >
            <option value='all' selected>
              All
            </option>
            <option value='inc'>Income</option>
            <option value='exp'>Expense</option>
          </select>
          <label htmlFor='categoryFilter'>Category: </label>
          <select
            name='categoryFilter'
            id='categoryFilter'
            defaultValue='---'
            onChange={e => setFilterCategory(e.target.value)}
          >
            {(filterType === 'inc'
              ? incomeCategories
              : filterType === 'exp'
              ? expenseCategories
              : categories
            ).map(c => (
              <option value={c}>{c}</option>
            ))}
            <option value={'---'}>{'---'}</option>
          </select>
        </div>
        <div>
          {transactions
            .filter(t =>
              txnFilter(t, { type: filterType, cat: filterCategory })
            )
            .map(txn => {
              return <Transaction {...txn} />
            })}
        </div>
      </div>
      {addTxnModalIsopen && (
        <NewTxnModal
          onClose={() => setAddTxnModalIsopen(false)}
          onFinish={t => setTransactions([...transactions, t])}
        />
      )}
    </div>
  )
}

export default App
