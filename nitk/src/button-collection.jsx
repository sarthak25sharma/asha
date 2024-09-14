
import './button-collection.css';

const InfoButton = () => {
  return (
    <div className="info-button">
      <a href="/contacts" className="button-section">
        <i className="icon phone-icon"></i>
        <span className="button-text">Contacts</span>
      </a>
      <div className="divider"></div>
      <a href="/medical-info" className="button-section">
        <i className="icon user-icon"></i>
        <span className="button-text">Medical Info</span>
      </a>
    </div>
  );
};

export default InfoButton;
