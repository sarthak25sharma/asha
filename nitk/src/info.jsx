import './info.css';
import './App.css';

function Info() {
  return (
    <div>
      <div className='phone'>
        <h1 className="contacts">Contacts</h1>
      
      <div className="contact-card">
        {/* Main Contact */}
        <div className="contact-header">
          <div className="contact-icon"></div>
          <div className="contact-info">
            <h3>Omansh Arora</h3>
            <p>Brother</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
  <div className="action-item">
    <input 
      type="checkbox" 
      className="action-icon live-location" 
      id="live-location" 
    />
    <label htmlFor="live-location">Live Location</label>
  </div>
  
  <div className="action-item">
    <input 
      type="checkbox" 
      className="action-icon call" 
      id="call" 
    />
    <label htmlFor="call">Call</label>
  </div>

  <div className="action-item">
    <input 
      type="checkbox" 
      className="action-icon email" 
      id="email" 
    />
    <label htmlFor="email">Email</label>
  </div>
</div>

      </div>
    </div>
    </div>
  );
}

export default Info;
