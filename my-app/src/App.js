import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/RTKQuery/store/store';
import Login from './components/Login';
import Sidebar from './components/MainScreen'; // This is your layout now
import PackedPaperRim from './components/PackedPaperRim';
import RolledPaperRim from './components/RolledPaperRim';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Sidebar Layout Route */}
          <Route path="/dashboard" element={<Sidebar />}>
            {/* Default content when no subroute is selected */}
            <Route index element={
              <div>
                <h1>Welcome to Dashboard</h1>
                <p>Select an option from the sidebar to view details.</p>
              </div>
            } />
            
            {/* Nested routes with fully qualified paths */}
            <Route path="FirstOption" element={<PackedPaperRim />} />
            <Route path="SecondOption" element={<RolledPaperRim />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
