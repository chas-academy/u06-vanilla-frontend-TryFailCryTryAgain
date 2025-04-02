import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './styles/main.css';

function App() {

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
