import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Layout ({ children }) {
  return (
    <div className=''>
      <header>
        <NavBar />
      </header>
      <main className='w-[95%] md:w-[80%] mx-[auto] min-h-[100vh]'>
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
    <div className='w-full bg-background shadow-lg py-2 px-4 flex justify-between border-black border-b-2 items-center'>
      <h2 className='text-3xl font-bold'>Track.It</h2>
      <nav className='hidden space-x-4 items-center md:block'>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/about'>About</Link>
        <Link to='/support'>Support</Link>
      </nav>
      <button className='hidden bg-black text-background px-2 py-1 rounded-full md:block hover:bg-black/80'>
        Login
      </button>
      <button className='md:hidden text-3xl' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : '≡'}
      </button>

      {/*Mobile Nav Links */}
      {isOpen && (
        <div className='fixed top-[50px] right-0 w-full bg-background'>
          <nav className='grid grid-cols-1'>
            <Link to='/' className='p-4 hover:bg-secondary' onClick={()=>setIsOpen(false)}>
              Home
            </Link>
            <Link to='/dashboard' className='p-4 hover:bg-secondary' onClick={()=>setIsOpen(false)}>
              Dashboard
            </Link>
            <Link to='/about' className='p-4 hover:bg-secondary' onClick={()=>setIsOpen(false)}>
              About
            </Link>
            <Link to='/support' className='p-4 hover:bg-secondary' onClick={()=>setIsOpen(false)}>
              Services
            </Link>
            <button className='text-left p-4 hover:bg-secondary'>Logout</button>
          </nav>
        </div>
      )}
    </div>
  )
}
