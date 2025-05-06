import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/RTKQuery/store/store'; // Import your Redux store
import Login from './components/Login';
import Sidebar from './components/MainScreen';
import PackedPaperRim from './components/PackedPaperRim';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/FirstOption" element={<PackedPaperRim />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
