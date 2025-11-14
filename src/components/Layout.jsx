import { useState } from 'react'

export default function Layout ({ children }) {
  return (
    <div className=''>
      <header>
        <NavBar />
      </header>
      <main className='w-[90%] mx-[auto] min-h-[100vh] bg-gray-50 shadow-xl'>
        {children}
      </main>
      <footer>

      </footer>
    </div>
  )
}

export function NavBar () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full bg-white shadow-lg py-2 px-4 flex justify-between border-black border-b-2 items-center'>
      <h2 className='text-3xl font-bold'>Track.It</h2>
      <nav className='hidden space-x-4 items-center md:block'>
        <a href=''>Home</a>
        <a href=''>Charts</a>
        <a href=''>About Us</a>
        <a href=''>Contact Us</a>
      </nav>
      <button className='hidden bg-black text-white px-2 py-1 rounded-full md:block hover:bg-black/80'>
        Login
      </button>
      <button className='md:hidden text-3xl' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : '≡'}
      </button>

      {/*Mobile Nav Links */}
      {isOpen && (
        <div className='fixed top-[50px] right-0 w-full bg-white'>
          <nav className='grid grid-cols-1'>
            <a href='' className='p-4 hover:bg-gray-200'>
              Home
            </a>
            <a href='' className='p-4 hover:bg-gray-200'>
              Charts
            </a>
            <a href='' className='p-4 hover:bg-gray-200'>
              About Us
            </a>
            <a href='' className='p-4 hover:bg-gray-200'>
              Contact Us
            </a>
            <button className='text-left p-4 hover:bg-gray-200'>Logout</button>
          </nav>
        </div>
      )}
    </div>
  )
}
