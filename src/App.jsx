import { useState } from 'react'

import Profile from './components/Profile.jsx'
import Transaction from './components/Transaction.jsx'
import Tabs from './components/Tabs.jsx'
import './css/style.css'

let expenseCategories = ['food', 'transport', 'internet', 'rent', 'miscellaneous']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent', 'miscellaneous']

function NewTxnModal ({ closeFunction, addTxn }) {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')
  const [category, setCategory] = useState(["miscellaneous"])

  let newTxnData = {
    type: 'exp',
    timeStamp: new Date().toLocaleString(),
    amount: 100,
    description: 'j',
    category: 'miscellaneous'
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
              closeFunction()
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
          <input type='number' name='amount' id='amount' onChange={(e)=>{newTxnData.amount=e.target.value}}/>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='decription'
            placeholder='Enter Description...'
            onChange={
              (e)=>{
                newTxnData.details = e.target.value
              }
            }
          ></textarea>
          <label htmlFor='txnTags'>Add Category</label>
          <select
            name='txnTags'
            id='txnTags'
            onChange={events => {
              newTxnData.category = events.target.value
            }}
          >
            {(selectedTxnType === 'exp' ? expenseCategories : incomeCategories).map(t => {
              return <option>{t}</option>
            })}
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
              console.log(newTxnData)
              addTxn(newTxnData)
              closeFunction()
            }}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  )
}

function App () {
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)
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
        <Tabs tabList={['All', 'Expenses', 'Income']} />
        <div>
          {transactions.map(txn => {
            return <Transaction {...txn} />
          })}
        </div>
      </div>
      {addTxnModalIsopen && (
        <NewTxnModal
          closeFunction={() => {
            setAddTxnModalIsopen(false)
          }}
          addTxn={t => {
            console.log(t)
            setTransactions([...transactions, t])
          }}
        />
      )}
    </div>
  )
}

export default App
