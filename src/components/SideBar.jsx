export default function SideBar () {
  return (
    <div className='fixed w-[150px] bg-white h-screen space-y-4 border-gray-500 border-r-1'>
      <h2 className='text-2xl font-bold pl-2'>Track.It</h2>
      <nav className='grid grid-cols-1 gap-4'>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>Home</a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>Charts</a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>About</a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>Contact US</a>
      </nav>
    </div>
  )
}
