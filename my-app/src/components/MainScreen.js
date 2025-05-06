
import '../componenet_styling/MainScreen.css'; // Import the CSS for styling
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2>Inventory Options</h2>
        <ul className="options-list">
          <li onClick={() => navigate('/FirstOption')}>Packed Paper Rims</li>
          <li>Rolled Paper Rim</li>
          <li>Packed Card</li>
          <li>Paper Rim Title Card</li>
          <li>Final Goods</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome to Dashboard</h1>
        <p>Select an option from the sidebar to view details.</p>
      </div>
    </div>
  );
}

export default Sidebar;

