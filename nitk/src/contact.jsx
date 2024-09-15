
import './App.css';
import './contact1.css'
import logo from './assets/main_button.png'; // Import the image
function Contact_info() {
    return (
        <div  className='phone'>
            <div>
            <h1 className="contacts">Contacts</h1>
            </div>
           
    <div className="contact-card">
      <div className="contact-info">
        <img
          src={logo}
          alt="Contact"
          className="contact-image"
        />
        <div>
          <h3 className="contact-name">Omansh Arora</h3>
          <p className="contact-relation">Brother</p>
        </div>
      </div>

      <div className="actions">
        <div className="action">
          <span className="icon live-location"></span>
          <span className="action-text">Live Location</span>
        </div>
        <div className="action disabled">
          <span className="icon call"></span>
          <span className="action-text">Call</span>
        </div>
        <div className="action">
          <span className="icon email"></span>
          <span className="action-text">Email</span>
        </div>
        <div className="action">
          <span className="icon sms"></span>
          <span className="action-text">SMS</span>
        </div>
      </div>

      <div className="other-contacts">
        <div className="contact-entry">
          <span className="icon user"></span>
          <span className="contact-text">Contact #2</span>
          <span className="relation-text">Relation</span>
        </div>
        <div className="contact-entry">
          <span className="icon user"></span>
          <span className="contact-text">Contact #3</span>
          <span className="relation-text">Relation</span>
        </div>
      </div>
    </div>
    <div className="contact-card2">
      <div className="contact-info">
        <img
          src={logo}
          alt="Contact"
          className="contact-image"
        />
        <div>
          <h3 className="contact-name">Dhruv</h3>
          <p className="contact-relation">Friend</p>
        </div>
      </div>

      <div className="actions">
        
        
      </div>

      <div className="other-contacts">
        <div className="contact-entry">
          <span className="icon user"></span>
          <span className="contact-text">Contact #2</span>
          <span className="relation-text">Relation</span>
        </div>

      </div>
    </div>
        </div>
    );
}

export default Contact_info;
