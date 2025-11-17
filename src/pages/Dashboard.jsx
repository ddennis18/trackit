import { useState } from 'react'

import Profile from '../components/Profile.jsx'
import Transaction from '../components/Transaction.jsx'
import Tabs from '../components/Tabs.jsx'
import Modal from '../components/Modal.jsx'
import NewTxnForm from '../components/Forms.jsx'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

function txnFilter (t, { type, cat }) {
  const typeCheck = type === 'all' || t.type === type
  const categoryCheck = cat === '---' || t.category === cat
  return typeCheck && categoryCheck
}

function sortTxn (txns, sortCriteria, sortOrder) {
  const criteria = t => (sortCriteria === 'time' ? t.timeStamp : t.amount)
  txns.sort((a, b) => criteria(a) - criteria(b))
  if (sortOrder === 'desc') {
    txns.reverse()
  }
  return txns
}

function computeStats(txns) {
  let totalExpenses = 0;
  let totalIncome = 0;
  txns.forEach((t)=>{
    if(t.type=='income'){
      totalIncome+=t.amount
    }
    else{
      totalExpenses+=t.amount
    }
  })
  return {net:totalIncome-totalExpenses, income:totalIncome, expense:totalExpenses}
}

export default function Dashboard () {
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('---')
  const [filterType, setFilterType] = useState('all')
  const [transactions, setTransactions] = useState([])
  const [sortCriteria, setSortCriteria] = useState('time')
  const [sortOrder, setSortOrder] = useState('desc')

  return (
    <div className='space-y-2 w-full'>
      <Profile userName='User' {...computeStats(transactions)}/>

      {/*Control buttons*/}
      <div className='space-x-1 pl-2'>
        <button
          className='px-2 py-1 bg-black text-white text-sm rounded-lg'
          onClick={() => setAddTxnModalIsopen(true)}
        >
          Add Txn
        </button>
      </div>

      {/*Transactions*/}
      <div className='space-y-2'>
        {/*Filter and Sorting*/}
        <div className='px-2 space-x-2  text-[.7rem] md:text-sm'>
          <label htmlFor='typeFilter' className='font-semibold'>
            Type:{' '}
          </label>
          <select
            name=''
            id='typeFilter'
            defaultValue='all'
            className='px-2 py-1 bg-gray-200 rounded-lg'
            onChange={e => setFilterType(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>
          <label htmlFor='categoryFilter' className='font-semibold'>
            Category:{' '}
          </label>
          <select
            name='categoryFilter'
            id='categoryFilter'
            className='px-2 py-1 bg-gray-200 rounded-lg'
            defaultValue='---'
            onChange={e => setFilterCategory(e.target.value)}
          >
            {(filterType === 'income'
              ? incomeCategories
              : filterType === 'expense'
              ? expenseCategories
              : categories
            ).map(c => (
              <option value={c}>{c}</option>
            ))}
            <option value={'---'}>{'---'}</option>
          </select>
          <label htmlFor='sortBy' className='font-semibold'>
            Sort By:
          </label>
          <select
            name='sortBy'
            id='sortBy'
            className='px-2 py-1 bg-gray-200 rounded-lg'
            onChange={e => setSortCriteria(e.target.value)}
          >
            <option value='time'>time</option>
            <option value='amount'>amount</option>
          </select>
          <label htmlFor='order' className='font-semibold'>
            Order:
          </label>
          <select
            name='order'
            id='order'
            className='px-2 py-1 bg-gray-200 rounded-lg'
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value='desc'>Descending</option>
            <option value='asce'>Ascending</option>
          </select>
        </div>
        {/*display*/}
        <div>
          {sortTxn(
            [
              ...transactions.filter(t =>
                txnFilter(t, { type: filterType, cat: filterCategory })
              )
            ],
            sortCriteria,
            sortOrder
          ).map(txn => {
            return (
              <Transaction
                onDelete={() => {
                  setTransactions([
                    ...transactions.filter(t => t.id !== txn.id)
                  ])
                }}
                {...txn}
              />
            )
          })}
        </div>
      </div>
      {addTxnModalIsopen && (
        <Modal>
          <NewTxnForm
            onClose={() => setAddTxnModalIsopen(false)}
            appendTxn={t => {
              t.id =
                transactions.length === 0
                  ? 0
                  : transactions[transactions.length - 1].id + 1
              setTransactions([...transactions, t])
            }}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
          />
        </Modal>
      )}
    </div>
  )
}
