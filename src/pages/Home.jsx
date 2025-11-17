import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div className='min-h-[500px] flex flex-col justify-center items-center gap-10'>
      <div className='text-center space-y-4'>
        <h1 className='text-6xl font-semibold mb-8'>Track.It</h1>
        <p>
          Optimize your Budget, Analyze your Spending and Track the Cash Flow!
        </p>
        <p>
          <b> Track.it </b>offers tools such Data Visualisation, AI analytics
          and Data Sorting and Extraction That enables you to properly
          Understand and Track the way you spend.
        </p>
        <div className='space-x-4'>
          <Link
            className='bg-primary text-white border-2 p-2 rounded-lg hover:bg-black/80'
            to='dashboard'
          >
            Get Started
          </Link>
          <Link
            className='bg-background text-black p-2 border-primary border-2 rounded-lg hover:bg-black hover:text-white transition'
            to='/support'
          >
            Contact
          </Link>
        </div>
      </div>
      <div className='flex flex-row justify-between w-full p-10'>
        <div className='h-[150px] w-[175px] shadow-sm p-2 rounded-xl flex flex-col justify-between'>
          <h3>
            Analyze!
          </h3>
          <span classNam='text-xhgh'>
            Using our Tools Your can Analyse data from spending patterns, and Gain valuable Insights, and Control How You Spend
          </span>
        </div>
        <div>dpp</div>
        <div>akfoaj</div>
      </div>
    </div>
  )
}
