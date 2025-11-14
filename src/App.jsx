import { useState } from 'react'

import Profile from './components/Profile.jsx'
import Transaction from './components/Transaction.jsx'
import SideBar from './components/SideBar.jsx'
import Tabs from './components/Tabs.jsx'
import { TxnModal } from "./components/Modals.jsx";
import './css/style.css'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

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
        <div className='space-x-1 pl-2'>
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
        <div className='pl-2 space-y-2'>
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
          <TxnModal
            onClose={() => setAddTxnModalIsopen(false)}
            onFinish={t => setTransactions([...transactions, t])}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
          />
        )}
      </div>
    </div>
  )
}

export default App
