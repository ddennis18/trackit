import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

export default function NewTxnForm ({
  onClose,
  appendTxn,
  incomeCategories,
  expenseCategories
}) {
  const [selectedTxnType, setSelectedTxnType] = useState('exp')

  const schema = yup.object().shape({
    type: yup.string().required(),
    amount: yup.number("required").positive("cannot be 0 or negative").integer("must be a whole number").required("required"),
    timeStamp: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().max(250)
  })

  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  let newTxnData = {
    type: 'exp',
    timeStamp: null,
    amount: 0,
    description: '',
    category: '---'
  }

  const submit = data => {
    console.log(data)
    appendTxn(data)
  }

  return (
    <form
      className='bg-background p-4 rounded-xl flex flex-col gap-1 shadow-xl'
      onSubmit={handleSubmit(submit)}
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
      <h2 className='text-2xl font-semibold text-cente mb-4'>
        Add A New Transaction!
      </h2>
        {/* Input Field for setting the transaction type */}
      <label htmlFor='type' className='font-semibold'>
        Transaction Type
      </label>
      <select
        className='px-2 py-1 bg-gray-200 rounded-lg w-min'
        {...register('type')}
        onChange={event => {
          newTxnData.type = event.target.value
          setSelectedTxnType(event.target.value)
        }}
      >
        <option value='exp'>Expense</option>
        <option value='inc'>Income</option>
      </select>

      {/* Input Field for setting the time Stamp */}
      <label htmlFor='timeStamp' className='font-semibold'>
        Time
      </label>
      <input
        type='datetime-local'
        {...register('timeStamp')}
        defaultValue={new Date().toISOString().slice(0, 16)}
      />
      <label htmlFor='amount' className='font-semibold'>
        Amount
      </label>
      <input
        type='number'
        className='px-2 py-1 rounded-lg border-1 border-gray-500'
        defaultValue='0'
        {...register('amount')}
        onChange={e => {
          newTxnData.amount = Number(e.target.value)
        }}
      />
      <p className='text-xs text-[#ff0000]'>{errors.amount?.message}</p>
      <label htmlFor='description' className='font-semibold'>
        Description
      </label>
      <textarea
        type='text'
        placeholder='Enter Description...'
        className='px-2 py-1 rounded-lg border-1 border-gray-500'
        {...register('description')}
        onChange={e => {
            newTxnData.details = e.target.value
        }}
      ></textarea>
        <p className='text-xs text-[#ff0000]'>{errors.description?.message}</p>
      <label htmlFor='category' className='font-semibold'>
        Set Category
      </label>
      <select
        defaultValue='---'
        {...register('category')}
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
