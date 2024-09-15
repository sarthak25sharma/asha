import './App.css';
import logo from './assets/main_button.png'; // Import the image
import { useState, useEffect } from 'react';
import { stemmer } from 'stemmer';
import emotionalWords from "./emotionalWords";  // Import the expanded dataset
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [listening, setListening] = useState(false); // Track if recognition is listening
  const [transcript, setTranscript] = useState('');  // Store the transcript
  //const [location, setLocation] = useState(null); // Store the location data
  const [area, setArea] = useState(null); // Store the area information
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [location, setLocation] = useState(null);
  const normalize = (word) => stemmer(word.toLowerCase());

  // Function to handle voice input
  const handleVoiceInput = () => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      checkForDangerContext(transcript);  // Automatically submit after voice input
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };

    setListening(true);
    recognition.start();
  };

  const checkForDangerContext = (sentence) => {
    const words = sentence.split(' ').map(normalize);
    let triggerCount = 0;

    // Trigger detection logic
    Object.keys(emotionalWords).forEach(category => {
      words.forEach(word => {
        if (emotionalWords[category].has(word)) {
          triggerCount++;
        }
      });
    });

    // If two or more trigger words are found, analyze the context
    if (triggerCount > 0) {
      setShowModal(true);
      setTimer(5);
      getUserLocation();  // Reset the timer to 5 seconds when the modal is shown
    }
    analyzeContext(sentence);
  };
  useEffect(() => {
    if (showModal && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && showModal) {
      handleModalClose('no');  // Automatically choose "No" if the timer reaches 0
    }
  }, [timer, showModal]);
  const handleModalClose = (answer) => {
    setShowModal(false);
    if (answer === 'no') {
      sendHelpEmail();  // Call the function to send the help email if unsafe
    }
  };
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation(null);
    }
  };

  async function sendHelpEmail() {
        const locationMessage = location
      ? `User's location: Latitude ${location.latitude}, Longitude ${location.longitude}`
      : 'Location not available.';

    const emailBody = `Urgent help needed. Please help me!\n\n${locationMessage}`;
    try {
      const response = await fetch('http://localhost:5000/send-help-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: emailBody })
      });

      const result = await response.json();
      alert("Help mail sent successfully!")
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while trying to send the email.');
    }
  }

  async function analyzeContext(sentence) {
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence })
      });

      const result = await response.json();
      if (result.context === 'UNSAFE') {
        // Same behavior as trigger > 0 (show modal and start timer)
        setShowModal(true);
        setTimer(5);  // Reset the timer to 5 seconds when UNSAFE context is detected
        getUserLocation(); 
      } else {
        alert('SAFE: The context does not indicate immediate danger.');
      }
    } catch (error) {
      console.error('Error analyzing context:', error);
    }
  }

  // useEffect(() => {
  //   // Check if the browser supports speech recognition
  //   if (!('webkitSpeechRecognition' in window)) {
  //     alert('Your browser does not support speech recognition. Try using Chrome.');
  //     return;
  //   }

  //   const recognition = new window.webkitSpeechRecognition(); // Initialize Speech Recognition
  //   recognition.continuous = true; // Keep recognizing even when the user pauses
  //   recognition.interimResults = true; // Show interim results
  //   recognition.lang = 'en-US'; // Set language

  //   // When recognition starts
  //   recognition.onstart = () => {
  //     console.log('Voice recognition started. You can speak now.');
  //   };

  //   // Handle the recognition result
  //   recognition.onresult = (event) => {
  //     let interimTranscript = '';
  //     let finalTranscript = '';

  //     // Loop through results
  //     for (let i = event.resultIndex; i < event.results.length; ++i) {
  //       if (event.results[i].isFinal) {
  //         finalTranscript += event.results[i][0].transcript;
  //       } else {
  //         interimTranscript += event.results[i][0].transcript;
  //       }
  //     }

  //     // Update the transcript with the recognized speech
  //     setTranscript(finalTranscript || interimTranscript);
  //   };

  //   // Handle recognition errors
  //   recognition.onerror = (event) => {
  //     console.error('Speech recognition error:', event.error);
  //   };

  //   // When the recognition ends
  //   recognition.onend = () => {
  //     setListening(false);
  //     console.log('Voice recognition ended.');
  //   };

  //   // Start or stop recognition based on listening state
  //   if (listening) {
  //     recognition.start();
  //   } else {
  //     recognition.stop();
  //   }

  //   return () => {
  //     recognition.stop(); // Stop recognition when component unmounts
  //   };
  // }, [listening]); // Re-run effect if listening state changes

  // Function to get the current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation({ latitude, longitude, accuracy });
          reverseGeocode(latitude, longitude); // Call reverse geocoding
        },
        (error) => {
          console.error('Error getting location:', error.message);
          alert('Unable to retrieve location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Function to reverse geocode coordinates
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      const address = data.address;
      setArea(`${address.city || ''}, ${address.state || ''}, ${address.country || ''}`);
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
      setArea('Unable to retrieve area information.');
    }
  };

  return (
    <div>
      <div className='phone'> 
      <button className='location-info' onClick={getLocation}>
        <FontAwesomeIcon icon={faLocationDot} className="icon location-icon" />{location && (
        <div>
          <p>Area: {area}</p>
        </div>
      )}
      </button>

      
        <div className='top-h'>
          <h2>tap to enable safe mode</h2>
        </div>
        <button className="circular-button" onClick={handleVoiceInput}>
          
          <img src={logo} alt="Image"/>
        </button>
        <div className='listen'>
      
        </div>
        <div className='listen2'>
          <p>Transcript: {transcript}</p>
        </div>
        {/* <button className='' onClick={saveTranscript}>Save Transcript as .txt</button> */}
      </div>
      {showModal && (
  <>
    <div className="modal-overlay" onClick={() => handleModalClose('no')}></div>
    <div className="modal">
      <p>Are you safe?</p>
      <button onClick={() => handleModalClose('yes')}>Yes</button>
      <button onClick={() => handleModalClose('no')}>No</button>
      <p>Auto selecting No in: {timer} seconds</p>
    </div>
  </>
)}

    </div>
  );
};

export default Hero;
