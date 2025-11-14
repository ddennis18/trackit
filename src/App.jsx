import { useState } from 'react'

import Profile from './components/Profile.jsx'
import Transaction from './components/Transaction.jsx'
import SideBar from './components/SideBar.jsx'
import Tabs from './components/Tabs.jsx'
import './css/style.css'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

function NewTxnModal ({ onClose, onFinish }) {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')

  let newTxnData = {
    type: 'exp',
    timeStamp: new Date().toLocaleString(),
    amount: 100,
    description: '',
    category: '---'
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center'>
      <div>
        <form
          className='bg-white p-4 rounded-xl flex flex-col gap-4 min-w-[500px]'
          action='xx.com'
        >
          <button
            className='self-end text-3xl px-2 rounded-full hover:bg-gray-200'
            onClick={e => {
              e.preventDefault()
              onClose()
            }}
          >
            x
          </button>
          <h2 className='text-lg font-semibold'>Add A New Transaction!</h2>
          <label htmlFor='txnType' className='font-semibold'>
            Transaction Type
          </label>
          <select
            name='txnType'
            id='txnType'
            className='px-2 py-1 bg-gray-200 rounded-lg w-min'
            onChange={event => {
              newTxnData.type = event.target.value
              setSelectedTxnType(event.target.value)
            }}
          >
            <option value='exp'>Expense</option>
            <option value='inc'>Income</option>
          </select>
          <label htmlFor='amount' className='font-semibold'>
            Amount
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            className='px-2 py-1 rounded-lg border-1 border-gray-500'
            onChange={e => (newTxnData.amount = e.target.value)}
          />
          <label htmlFor='description' className='font-semibold'>
            Description
          </label>
          <textarea
            type='text'
            name='decription'
            placeholder='Enter Description...'
            className='px-2 py-1 rounded-lg border-1 border-gray-500'
            onChange={e => {
              newTxnData.details = e.target.value
            }}
          ></textarea>
          <label htmlFor='txnTags' className='font-semibold'>
            Set Category
          </label>
          <select
            name='txnTags'
            id='txnTags'
            defaultValue='---'
            className='px-2 py-1 bg-gray-200 rounded-lg w-min'
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

          {/*Submit-button */}
          <button
            type='submit'
            className='text-sm font-semibold bg-green-600 w-max p-2 rounded-lg text-white self-center hover:bg-green-900'
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
      <SideBar />
      <div className='space-y-2 ml-[150px]'>
        <Profile userName='User' />

        {/*Control buttons*/}
        <div className='space-x-1 pl-4'>
          <button
            className='px-2 py-1 bg-black text-white text-sm rounded-lg'
            onClick={() => setAddTxnModalIsopen(true)}
          >
            Add Txn
          </button>
          <button className='px-2 py-1 bg-black text-white text-sm rounded-lg'>
            Add Tag
          </button>
        </div>

        {/*Transactions*/}
        <div className='pl-4 space-y-2'>
          <div className='space-x-4'>
            <label htmlFor='typeFilter' className='font-semibold'>
              Type:{' '}
            </label>
            <select
              name=''
              id='typeFilter'
              defaultValue='all'
              className='px-2 py-1 bg-gray-200 rounded-lg text-sm'
              onChange={e => setFilterType(e.target.value)}
            >
              <option value='all' selected>
                All
              </option>
              <option value='inc'>Income</option>
              <option value='exp'>Expense</option>
            </select>
            <label htmlFor='categoryFilter' className='font-semibold'>
              Category:{' '}
            </label>
            <select
              name='categoryFilter'
              id='categoryFilter'
              className='px-2 py-1 bg-gray-200 rounded-lg text-sm'
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
    </div>
  )
}

export default App
