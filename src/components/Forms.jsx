import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function NewTxnForm ({
  onClose,
  onFinish,
  incomeCategories,
  expenseCategories
}) {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')
  const [register, handleSubmit] = useForm()

  let newTxnData = {
    type: 'exp',
    timeStamp: null,
    amount: 0,
    description: '',
    category: '---'
  }
  return (
    <form
      className='bg-white p-4 rounded-xl flex flex-col gap-4 min-w-[500px] shadow-xl'
      onSubmit={e => {
        e.preventDefault()
        if (newTxnData.amount === 0) {
          alert('Enter A Valid Amount')
          return
        }
        newTxnData.type = selectedTxnType
        newTxnData.timeStamp = new Date()
        onFinish(newTxnData)
        onClose()
      }}
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
      <h2 className='text-2xl font-semibold text-center'>
        Add A New Transaction!
      </h2>
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
        required
        onChange={e => {
          newTxnData.amount = Number(e.target.value)
        }}
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
        {(selectedTxnType === 'exp' ? expenseCategories : incomeCategories).map(
          t => {
            return <option value={t}>{t}</option>
          }
        )}
        <option value='---'>{'---'}</option>
      </select>

      {/*Submit-button */}
      <button
        type='submit'
        className='text-sm font-semibold bg-green-600 w-max p-2 rounded-lg text-white self-center hover:bg-green-600/80'
      >
        Add Transaction
      </button>
    </form>
  )
}
