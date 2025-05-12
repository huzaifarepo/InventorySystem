import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2>Inventory Options</h2>
        <ul className="options-list">
          {/* Use Link to navigate to routes */}
          <li className={isActive('/dashboard/FirstOption') ? 'selected' : ''}>
            <Link to="/dashboard/FirstOption">Packed Paper Rims</Link>
          </li>
          <li className={isActive('/dashboard/SecondOption') ? 'selected' : ''}>
            <Link to="/dashboard/SecondOption">Rolled Paper Rim</Link>
          </li>
           <li className={isActive('/dashboard/ThirdOption') ? 'selected' : ''}>
            <Link to="/dashboard/ThirdOption">Packed Card Rim</Link>
          </li>
          
        </ul>
      </div>
      <div className="main-content">
       <Outlet /> 
      </div>
    </div>
  );
}

export default Sidebar;
