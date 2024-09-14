import { Routes, Route, Link } from 'react-router-dom';
import Info from './info.jsx';
import Contact_info from './contact.jsx';
import Hero from './Hero.jsx';
import './App.css';
import './button-collection.css';

function Home() {
  return (
    <>
      <div className="info-button">
        <Link to="/contact" className="button-section">
          <i className="icon phone-icon"></i>
          <span className="button-text">Contacts</span>
        </Link>
        
        <div className='home-button'>
          <Link to="/hero" className='button-section'>
            <i className='icon home-icon'></i>
            <span className='button-text'>Home</span>
          </Link>
        </div>

        <div className="divider"></div>

        <Link to="/info" className="button-section">
          <i className="icon user-icon"></i>
          <span className="button-text">Medical Info</span>
        </Link>
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
