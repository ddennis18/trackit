//Generic Modal Component
export default function Modal ({children}) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-secondary/50 flex justify-center items-center'>
      <div>
        {children}
      </div>
    </div>
  )
}
