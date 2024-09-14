import './App.css'
import { BrowserRouter as Router,Route , Routes } from 'react-router-dom'
import Info from './info.jsx';
import Contact_info from './contact.jsx';


function App() {

  return (
    <>
    <Router>

    <Routes>
        <Route path='/info'>  
          <Info/>
        </Route>
        <Route path='/contact'>
          <Contact_info/>
        </Route>
        
    </Routes>
    
    </Router>
    </>
  )
}

export default App
