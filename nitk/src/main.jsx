// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import Home from './Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Home/>
    </Router>
  </StrictMode>,
);
