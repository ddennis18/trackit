import { useState, useEffect } from 'react'

import Profile from '../components/Profile.jsx'
import Transaction from '../components/Transaction.jsx'
import TabSection from '../components/TabSection.jsx'
import Modal from '../components/Modal.jsx'
import NewTxnForm from '../components/Forms.jsx'
import { Pie, PieChart, Cell, Label, LabelList } from 'recharts'
import { supabase } from '../supaBaseClient.jsx'

let expenseCategories = ['food', 'transport', 'internet', 'rent']
let incomeCategories = ['loan', 'friend', 'gift', 'scholarship', 'parent']
let categories = [...expenseCategories, ...incomeCategories]

//#region utilities
function formatDate (date) {
  return date.split('-').reverse().join('-')
}

function txnFilter (t, { type, cat, dateStart, dateEnd }) {
  const typeCheck = type === 'all' || t.type === type
  const categoryCheck = cat === '---' || t.category === cat
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

function getCategory (txns, type) {
  txns = txns.filter(t => t.type == type)
  const categories = type == 'income' ? incomeCategories : expenseCategories
  const totals = Array(categories.length)
  totals.fill(0)
  txns.forEach(t => {
    totals[categories.indexOf(t.category)] += t.amount
  })
  return totals
    .map((t, i) => {
      return { name: categories[i], value: t }
    })
    .filter(d => d.value != 0)
}

//#endregion

//MARK: reusable piechart component
export function PieChartComponent ({ data }) {
  const RADIAN = Math.PI / 180
  const N = data.length
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value
  }) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const ncx = Number(cx)
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
    const ncy = Number(cy)
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={'middle'}
        dominantBaseline='central'
        style={{ fontSize: '.7rem', fontWeight: '600' }}
      >
        {`${name[0].toUpperCase() + name.slice(1)}: $${value}`}
      </text>
    )
  }
  return (
    <PieChart
      className=''
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '500px',
        maxHeight: '80vh'
      }}
    >
      <Pie
        data={data}
        dataKey={'value'}
        cx='50%'
        cy='40%'
        outerRadius='80%'
        labelLine={false}
        label={renderLabel}
        cornerRadius={'2px'}
      >
        {data.map((d, i) => {
          return (
            <Cell
              key={`cell-${d.name + '-' + i.toString()}`}
              fill={`hsl(${(i / N) * 180},50%,50%)`}
            ></Cell>
          )
        })}
      </Pie>{' '}
    </PieChart>
  )
}

//MARK:Dashboard Component
export default function Dashboard () {
  //#region definitions
  const [addTxnModalIsopen, setAddTxnModalIsopen] = useState(false)
  const [errorState, setErrorState] = useState({
    isModalOpen: false,
    message: ''
  })
  const [filterCategory, setFilterCategory] = useState('---')
  const [filterType, setFilterType] = useState('all')
  const [transactions, setTransactions] = useState([])
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
  //endregion

  const handleError = message => {
    setErrorState({ isModalOpen: true, message })
  }

  //MARK: supabase data fetching on load
  const fetchData = async () => {
    const { error, data } = await supabase.from('transactions').select('*')
    if (error) {
      handleError(
        'Failed To Fetch Data!, try reloading the page or checking your internet connection '
      )
      return
    }
    setTransactions(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  //MARK:Txn List
  function TransactionList () {
    {
      /*Transactions List*/
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
            className='px-2 py-1 bg-secondary rounded-lg w-min'
            onChange={e => setStartDate(e.target.value)}
          ></input>
          <label htmlFor='endDate' className='font-semibold'>
            End Date:
          </label>
          <input
            name='endDate'
            id='emdDate'
            type='date'
            className='px-2 py-1 bg-secondary rounded-lg w-min'
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

  //MARK:Txn Table
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
                  <tr className='text-xs'>
                    <td className='p-1 border-theme-one border-1'>
                      <div className='flex justify-between'>
                        <span>{pair[1]?.amount}</span>{' '}
                        <span className='text-[.6rem]'>
                          {pair[1]?.category !== undefined
                            ? 'Category: ' + pair[1]?.category
                            : ''}
                        </span>
                      </div>
                    </td>
                    <td className='p-1 border-theme-one border-1'>
                      <div className='flex justify-between'>
                        <span>{pair[0]?.amount}</span>{' '}
                        <span className='text-[.6rem]'>
                          {pair[0]?.category !== undefined
                            ? 'Category: ' + pair[0]?.category
                            : ''}
                        </span>
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

  //MARK:Txn charts
  function Charts () {
    const stats = computeStats(transactions)
    const [chartType, setChartType] = useState('income')

    return (
      <div className='grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[800px]'>
        <PieChartComponent
          data={[
            { name: 'income', value: stats.income },
            { name: 'expense', value: stats.expense }
          ]}
        ></PieChartComponent>
        <div>
          <div className='px-2 space-x-1 flex flex-row text-xs justify-start items-center'>
            <label htmlFor='typeFilter' className='font-semibold'>
              Type:{' '}
            </label>
            <select
              name=''
              id='typeFilter'
              defaultValue='income'
              className='px-2 py-1 bg-secondary rounded-lg'
              onChange={e => setChartType(e.target.value)}
            >
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <PieChartComponent
            data={getCategory(transactions, chartType)}
          ></PieChartComponent>
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
        tabList={['List', 'Table', 'Charts']}
        contentList={[<TransactionList />, <TransactionTable />, <Charts />]}
        defaultTab={0}
      />

      {/*MARK: Modal For adding Transactions */}
      {addTxnModalIsopen && (
        <Modal>
          <NewTxnForm
            onClose={() => setAddTxnModalIsopen(false)}
            appendTxn={async t => {
              //MARK: append new txn on load
              t.id =
                transactions.length === 0
                  ? 0
                  : transactions[transactions.length - 1].id + 1

              const { error, data } = await supabase
                .from('transactions')
                .insert(t)
                .single()

              //no errors
              if (!error) {
                setTransactions([...transactions, t])
              }
              console.error(error, data)
            }}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
          />
        </Modal>
      )}
      {errorState.isModalOpen && (
        <Modal>
          <div className='p-4 bg-white rounded-xl flex flex-col gap-4 items-center'>
            <h2 className='font-semibold'>An Error has Occurred!</h2>
            <p>{errorState.message}</p>
            <button
              className='bg-[#ff0000] px-2 py-1 text-white font-semibold w-min rounded-lg'
              onClick={() =>
                setErrorState({ ...errorState, isModalOpen: false })
              }
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
