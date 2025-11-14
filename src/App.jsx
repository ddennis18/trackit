import { SideBar, NavBar } from './components/Layout.jsx'
import Dashboard  from "./pages/Dashboard.jsx";

function App () {
  return (
    <div>
      <NavBar />
      <SideBar />
      <Dashboard/>
    </div>  
  )
}

export default App
