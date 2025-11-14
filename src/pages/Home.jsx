export default function Home () {
  return (
    <div className='min-h-[500px] flex justify-center items-center h-60'>
      <div className='text-center space-y-4'>
        <h1 className='text-6xl font-semibold mb-8'>Track.It</h1>
        <p>
          Optimize your Budget, Analyze your Spending and Track the Cash Flow!
        </p>
        <p>
          <b> Track.it </b>offers tools such Data Visualisation, AI analytics
          and Data Sorting and Extraction That enables you to properly Understand and Track the way you spend.
        </p>
        <div className='space-x-4'>
          <button className='bg-black text-white p-2 rounded-full hover:bg-black/80'>
            Get Started
          </button>
          <a className='bg-white text-black p-2 border-black border-3 rounded-full hover:bg-black hover:text-white transition'>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
