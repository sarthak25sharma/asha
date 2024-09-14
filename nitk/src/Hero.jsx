import './App.css';
import logo from './assets/main_button.png'; // Import the image
import { useState, useEffect } from 'react';

function Hero() {
  const [listening, setListening] = useState(false); // Track if recognition is listening
  const [transcript, setTranscript] = useState('');  // Store the transcript
  const [location, setLocation] = useState(null); // Store the location data
  const [area, setArea] = useState(null); // Store the area information

  useEffect(() => {
    // Check if the browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Try using Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition(); // Initialize Speech Recognition
    recognition.continuous = true; // Keep recognizing even when the user pauses
    recognition.interimResults = true; // Show interim results
    recognition.lang = 'en-US'; // Set language

    // When recognition starts
    recognition.onstart = () => {
      console.log('Voice recognition started. You can speak now.');
    };

    // Handle the recognition result
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      // Loop through results
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Update the transcript with the recognized speech
      setTranscript(finalTranscript || interimTranscript);
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // When the recognition ends
    recognition.onend = () => {
      setListening(false);
      console.log('Voice recognition ended.');
    };

    // Start or stop recognition based on listening state
    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop(); // Stop recognition when component unmounts
    };
  }, [listening]); // Re-run effect if listening state changes

  // Function to save the transcript as a text file
  const saveTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transcript.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      const data = await response.json();
      const address = data.address;
      setArea(`${address.city || ''}, ${address.state || ''}, ${address.country || ''}`);
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
      setArea('Unable to retrieve area information.');
    }
  };

  return (
    <div className='poppins-regular'>
    <div className="phone poppin">
      <div className="phone-content">
        <button className='location-info' onClick={getLocation}>Get Current Location</button>
        {location && (
          <div >
            <p>Area: {area}</p>
          </div>
        )}

        <div className='background-button '>
          <button onClick={() => setListening(!listening)}>
            <img className='logoimg' src={logo} alt="asha logo" />
          </button>
        </div>
        <div className='text-black'>
          {listening ? 'Stop Listening' : 'Start Listening'}
        </div>

        <p>Transcript: {transcript}</p>

        <button onClick={saveTranscript}>Save Transcript as .txt</button>
      </div>

      
    </div>
    </div>  
  );
}

export default Hero;
