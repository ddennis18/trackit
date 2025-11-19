import { useState, useEffect } from 'react'

import Profile from '../components/Profile.jsx'
import Transaction from '../components/Transaction.jsx'
import TabSection from '../components/TabSection.jsx'
import Modal from '../components/Modal.jsx'
import NewTxnForm from '../components/Forms.jsx'
import { useData } from '../hooks/useData.jsx'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

function formatDate (date) {
  console.log(date)
  return date.split('-').reverse().join('-')
}

function txnFilter (t, { type, cat, dateStart, dateEnd }) {
  const typeCheck = type === 'all' || t.type === type
  const categoryCheck = cat === '---' || t.category === cat
  console.log(dateEnd, dateEnd, 'kl')
  const startDateCheck =
    dateStart === null || new Date(t.timeStamp + ':00.000Z') >= dateStart
  const endDateCheck =
    dateEnd === null || new Date(t.timeStamp + ':00.000Z') <= dateEnd
  return typeCheck && categoryCheck && startDateCheck && endDateCheck
}

function sortTxn (txns, sortCriteria, sortOrder) {
  const criteria = t => (sortCriteria === 'time' ? t.timeStamp : t.amount)
  txns.sort((a, b) => criteria(a) - criteria(b))
  if (sortOrder === 'desc') {
    txns.reverse()
  }
  return txns
}

function zipLongest (...arrays) {
  const length = Math.max(...arrays.map(arr => arr.length))
  return Array.from({ length }, (_, i) => arrays.map(arr => arr[i]))
}

function txnPair (txns) {
  const incomeList = txns.filter(t => t.type == 'income')
  const expenseList = txns.filter(t => t.type == 'expense')
  console.log(zipLongest(incomeList, expenseList))
  return zipLongest(incomeList, expenseList)
}

function computeStats (txns) {
  let totalExpenses = 0
  let totalIncome = 0
  txns.forEach(t => {
    if (t.type == 'income') {
      totalIncome += t.amount
    } else {
      totalExpenses += t.amount
    }
  })
  return {
    net: totalIncome - totalExpenses,
    income: totalIncome,
    expense: totalExpenses
  }
}

export default function Dashboard () {
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('---')
  const [filterType, setFilterType] = useState('all')
  const [transactions, setTransactions] = useData([
    {
      id: 0,
      amount: 1,
      timeStamp: '2024-01-01T00:00',
      type: 'expense',
      description: ',',
      category: '---'
    }
  ])
  const [sortCriteria, setSortCriteria] = useState('time')
  const [sortOrder, setSortOrder] = useState('desc')
  const [startDate, setStartDate] = useState('01-01-1999')
  {
    /*Default value for end date is tomorrow thats why we have this 'fancy' code here*/
  }
  const [endDate, setEndDate] = useState(
    formatDate(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    )
  )

  const [sortTableCriteria, setTableSortCriteria] = useState('time')
  const [sortTableOrder, setTableSortOrder] = useState('desc')

  useEffect(() => {
    setTransactions(JSON.parse(localStorage.getItem('txn')) || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function TransactionList () {
    {
      /*Transactions*/
    }
    return (
      <div className='space-y-2'>
        {/*Filter and Sorting*/}
        <div className='px-2 space-x-1 space-y-2 text-xs grid grid-cols-4 md:grid-cols-8 items-center text-right'>
          <label htmlFor='typeFilter' className='font-semibold'>
            Type:{' '}
          </label>
          <select
            name=''
            id='typeFilter'
            defaultValue='all'
            className='px-2 py-1 bg-secondary rounded-lg'
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
            className='px-2 py-1 bg-secondary rounded-lg'
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
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setSortCriteria(e.target.value)}
          >
            <option value='time'>chronological</option>
            <option value='amount'>amount</option>
          </select>
          <label htmlFor='order' className='font-semibold'>
            Order:
          </label>
          <select
            name='order'
            id='order'
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value='desc'>Descending</option>
            <option value='asce'>Ascending</option>
          </select>
          <label htmlFor='startDate' className='font-semibold'>
            Start Date:
          </label>
          <input
            name='startDate'
            id='startDate'
            type='date'
            defaultValue='1999-01-01'
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setStartDate(e.target.value)}
          ></input>
          <label htmlFor='endDate' className='font-semibold'>
            End Date:
          </label>
          <input
            name='endDate'
            id='emdDate'
            type='date'
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setEndDate(e.target.value)}
          ></input>
        </div>
        {/*display*/}
        <div>
          {sortTxn(
            [
              ...transactions.filter(t =>
                txnFilter(t, {
                  type: filterType,
                  cat: filterCategory,
                  dateStart: new Date(formatDate(startDate) + 'T00:00:00.000Z'),
                  dateEnd: new Date(formatDate(endDate) + 'T00:00:00.000Z')
                })
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
    )
  }

  function TransactionTable () {
    return (
      <div className='space-y-2'>
        <div className='px-2 space-x-2  text-[.7rem] md:text-sm'>
          <label htmlFor='sortBy' className='font-semibold'>
            Sort By:
          </label>
          <select
            name='sortBy'
            id='sortBy'
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setTableSortCriteria(e.target.value)}
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
            className='px-2 py-1 bg-secondary rounded-lg'
            onChange={e => setTableSortOrder(e.target.value)}
          >
            <option value='desc'>Descending</option>
            <option value='asce'>Ascending</option>
          </select>
        </div>
        <div className='px-2'>
          <table className='min-w-full border-collapse border border-gray-300'>
            <thead>
              <tr>
                <th className='px-4 py-1 border-theme-one border-1'>Expense</th>
                <th className='px-4 py-1 border-theme-one border-1'>Income</th>
              </tr>
            </thead>
            <tbody>
              {txnPair(
                sortTxn([...transactions], sortTableCriteria, sortTableOrder)
              ).map(pair => {
                return (
                  <tr className='text-sm'>
                    <td className='px-4 py-1 border-theme-one border-1'>
                      <div className='flex justify-between'>
                        <span>{pair[1]?.amount}</span>{' '}
                        <span>{(pair[1]?.category!==undefined?("Category: "+ pair[1]?.category):"")}</span>
                      </div>
                    </td>
                    <td className='px-4 py-1 border-theme-one border-1'>
                      <div className='flex justify-between'>
                        <span>{pair[0]?.amount}</span>{' '}
                        <span>{(pair[0]?.category!==undefined?("Category: "+ pair[0]?.category):"")}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-2 w-full'>
      <Profile userName='User' {...computeStats(transactions)} />

      {/*Control buttons*/}
      <div className='space-x-1 pl-2'>
        <button
          className='px-2 py-1 bg-black text-background text-sm rounded-lg'
          onClick={() => setAddTxnModalIsopen(true)}
        >
          Add Txn
        </button>
      </div>

      <TabSection
        tabList={['List', 'Table']}
        contentList={[<TransactionList />, <TransactionTable />]}
      />

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
