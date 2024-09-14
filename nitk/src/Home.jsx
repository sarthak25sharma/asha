import { Routes, Route, Link } from 'react-router-dom';
import Info from './info.jsx';
import Contact_info from './contact.jsx';
import Hero from './Hero.jsx';
import './App.css';
import './button-collection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faHome } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <>
 <div className="info-button">
      <Link to="/contact" className="button-section">
        <FontAwesomeIcon icon={faPhone} className="icon phone-icon" />
        <span className="button-text">Contacts</span>
      </Link>
      <div className="divider"></div>
      <div className='home-button'>
        <Link to="/hero" className='button-section'>
          <FontAwesomeIcon icon={faHome} className='icon home-icon' />
          <span className='button-text'>Home</span>
        </Link>
      </div>

      <div className="divider"></div>
      <Link to="/info" className="button-section">
        <FontAwesomeIcon icon={faUser} className="icon user-icon" />
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
