import './info.css';
import './App.css';
import logo from './assets/main_button.png'; // Import the image
function Info() {
  return (
    <div className='phone'>
      <div className="profile-card">
            <div className="profile-info">
              <img
                src={logo}
                alt="Profile"
                className="profile-image"
              />
              <h2 className="profile-name">Sasha G</h2>
              <p className="profile-title">Scientist</p>
            </div>

            <div className="profile-details">
              <p className="detail-label">Age <span className="detail-value">22 years</span></p>
              <p className="detail-label">Blood Group <span className="detail-value">B+</span></p>
              
              <p className="detail-label">Medical History</p>
              <ul className="medical-history">
                <li>1. <strong>Asthma</strong></li>
                <li>2. <strong>Diabetes</strong></li>
              </ul>

              <p className="detail-label">Birth mark</p>
              <p className="birthmark-detail"><strong>Scar on right arm</strong></p>
            </div>
          </div>
          
    </div>
  );
}

export default Info;
