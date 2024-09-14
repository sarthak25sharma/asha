import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Info from './info.jsx';
import Contact_info from './contact.jsx';
import Hero from './Hero.jsx';
import './App.css'
function Home() {
    return (
        <>
        <div className='menu-buttonz'>
            <Link to="/hero"><button className='phone-button'>Hero</button></Link>
            <Link to="/info"><button className='phone-button'>Info</button></Link>
            <Link to="/contact"><button className='phone-button'>Contact</button></Link>
        </div>
      
        <Routes>
            <Route path="/hero" element={<Hero key="hero" />} />
            <Route path="/info" element={<Info key="info" />} />
            <Route path="/contact" element={<Contact_info key="contact" />} />
        </Routes>

        </>
    );
}

export default Home;
