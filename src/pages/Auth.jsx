import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { supabase } from '../supaBaseClient'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Contexts'

export default function Auth () {
  const [isSignUp, setIsSignUp] = useState(true)
  const navigate = useNavigate()
  const { setUserData } = useContext(UserDataContext)

  function SignUp () {
    const [successful, setSuccessful] = useState(false)
    const schema = yup.object().shape({
      userName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8)
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Must Confirm Password')
    })

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })

    const submit = async info => {
      // eslint-disable-next-line no-unused-vars
      const { error, data } = await supabase.auth.signUp({
        email: info.email,
        password: info.password
      })

      if (!error) {
        const x = await supabase
          .from('profile')
          .insert({ username: info.userName, user_id: data.user.id })
        console.log(x, 'kdkdkdkd')
        setSuccessful(true)
      }
    }

    return (
      <div>
        <div className='pt-8 space-y-4 max-w-[300px] mx-auto'>
          <h1 className='text-center text-4xl font-bold'>Sign Up</h1>
          <form
            className='p-4 border-theme-one border-1 rounded-2xl flex flex-col gap-1'
            onSubmit={handleSubmit(submit)}
          >
            {
              //#region form content
            }
            <label
              htmlFor='userName'
              className='w-full pl-1 text-sm font-semibold'
            >
              User Name{' '}
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.userName?.message}
              </span>
            </label>
            <input
              type='text'
              {...register('userName')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <label htmlFor='email' className='pl-1 text-sm font-semibold'>
              Email
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.email?.message}
              </span>
            </label>
            <input
              type='email'
              {...register('email')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <label htmlFor='password' className='pl-1 text-sm font-semibold'>
              Password
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.password?.message}
              </span>
            </label>
            <input
              type='password'
              {...register('password')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <label
              htmlFor='confirmPassword'
              className='pl-1 text-sm font-semibold'
            >
              Confirm Password
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.confirmPassword?.message}
              </span>
            </label>
            <input
              type='password'
              {...register('confirmPassword')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <p>
              Have an account{' '}
              <button
                className='text-blue-500'
                onClick={() => setIsSignUp(false)}
              >
                sign in
              </button>{' '}
            </p>
            {successful && <p>Check Your mail for authentication</p>}
            <button
              type='submit'
              className='text-sm font-semibold bg-green-600 w-max p-2 rounded-lg text-background self-center hover:bg-green-600/80'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    )
  }

  function SignIn () {
    const [error, setError] = useState(null)

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8)
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .required()
    })

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })

    const submit = async info => {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: info.email,
        password: info.password
      })

      console.log(data)

      if (error) {
        setError('invalid credentials')
      } else {
        setUserData(data.user)
        navigate('/dashboard')
      }
    }

    return (
      <div>
        <div className='pt-8 space-y-4 max-w-[300px] mx-auto'>
          <h1 className='text-center text-4xl font-bold'>Sign In</h1>
          <form
            className='p-4 border-theme-one border-1 rounded-2xl flex flex-col gap-1'
            onSubmit={handleSubmit(submit)}
          >
            {
              //#region form content
            }
            <label htmlFor='email' className='pl-1 text-sm font-semibold'>
              Email
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.email?.message}
              </span>
            </label>
            <input
              type='email'
              {...register('email')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <label htmlFor='password' className='pl-1 text-sm font-semibold'>
              Password
              <span className='text-red-500 ml-8 w-full text-right text-xs'>
                {errors.password?.message}
              </span>
            </label>
            <input
              type='password'
              {...register('password')}
              className='p-1 border-theme-one border-1 rounded-lg'
            />
            <p className='text-xs text-red-500'>{error}</p>
            <p>
              Don't have an account{' '}
              <button
                className='text-blue-500'
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>{' '}
            </p>
            <button
              type='submit'
              className='text-sm font-semibold bg-green-600 w-max p-2 rounded-lg text-background self-center hover:bg-green-600/80'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      {isSignUp && <SignUp />}
      {!isSignUp && <SignIn />}
    </div>
  )
}
