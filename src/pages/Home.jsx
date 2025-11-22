import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div className='min-h-[500px] flex flex-col justify-center items-center gap-10 py-10'>
      <div className='text-center space-y-4'>
        <h1 className='text-6xl font-semibold mb-8'>Track.It</h1>
        <p>
          Optimize your Budget, Analyze your Spending and Track the Cash Flow!
        </p>
        <p>
          <b> Track.it </b>offers tools such Data Visualisation Data Sorting and Extraction That enables you to properly
          Understand and Track the way you spend.
        </p>
        <div className='space-x-4'>
          <Link
            className='bg-primary border-black text-background border-2 p-2 rounded-lg hover:bg-black/80'
            to='/auth'
          >
            Get Started
          </Link>
          <Link
            className='bg-background text-black p-2 border-primary border-2 rounded-lg hover:bg-black hover:text-background transition'
            to='/support'
          >
            Contact
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 w-full p-10 gap-4'>
        <div className='shadow-lg p-4 rounded-xl flex flex-col gap-12 justify-between'>
          <h3 className='font-semibold self-center'>Analyze!</h3>
          <span className='text-sm'>
            Using our Tools Your can Analyse data from spending patterns, and
            Gain valuable Insights, and Control How You Spend
          </span>
        </div>
        <div className='shadow-lg p-4 rounded-xl flex flex-col gap-12 justify-between'>
          <h3 className='font-semibold self-center'>Optimize!</h3>
          <span className='text-sm'>
            Using Analytical tools you can track your spending history and kill bad spending habits always make the smart choice
          </span>
        </div>
        <div className='shadow-lg p-4 rounded-xl flex flex-col gap-12 justify-between'>
          <h3 className='font-semibold self-center'>Control</h3>
          <span className='text-sm'>
            You have control over your data we keep. And You are rest assured that your data is kept safely and you have control over it
          </span>
        </div>
      </div>
    </div>
  )
}
