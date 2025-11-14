export function NavBar () {
  return (
    <div className='w-screen bg-white shadow-lg p-2 flex justify-between border-black border-b-2'>
      <h2 className='text-2xl font-bold pl-2'>Track.It</h2>
    </div>
  )
}
export function SideBar () {
  return (
    <div className='fixed top-[50px] h-screen w-[150px] bg-white border-gray-500 border-r-1 pt-4'>
      <nav className='grid grid-cols-1 gap-4'>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>
          Home
        </a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>
          Charts
        </a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>
          About
        </a>
        <a href='' className='border-b-1 border-gray-500 pl-2 font-semibold'>
          Contact US
        </a>
        <button className='border-b-1 border-gray-500 pl-2 font-semibold text-left'>
          Logout
        </button>
      </nav>
    </div>
  )
}
