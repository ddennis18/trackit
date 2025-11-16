import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<h1>PAGE NOT READY</h1>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
