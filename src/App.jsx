import { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './supaBaseClient.jsx'
import { UserDataContext } from './Contexts.jsx'

function App () {
  const [session, setSession] = useState(null)
  const [userData, setUserData] = useState(null)

  const logout = async () => {
    const { data, error } = await supabase.auth.signOut()
    setUserData(null)
    setSession(null)
  }

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    console.log(currentSession)
    if (currentSession.data.session) {
      setUserData(currentSession.data.session.user)
    }
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    fetchSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className='App'>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Layout logout={logout}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<h1>PAGE NOT READY</h1>} />
            </Routes>
          </Layout>
        </Router>
      </UserDataContext.Provider>
    </div>
  )
}

export default App
