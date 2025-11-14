export default function Home () {
  return (
    <div className='w-full flex justify-center items-center h-60'>
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold'>Track.It</h1>
        <p>
          Optimize your Budget, Analyze your Spending and Track the Cash Flow.
        </p>
        <div className='space-x-4'>
          <button className='bg-black text-white p-2 rounded-xl hover:bg-black/80'>
            Get Started
          </button>
          <a className='bg-white text-black p-2 border-black border-3 rounded-xl hover:bg-black hover:text-white transition'>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
