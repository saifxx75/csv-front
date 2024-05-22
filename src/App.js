import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadComponent from './FileUploadComponent';
import FetchCSVDataComponent from './FetchCSVDataComponent'; 
import './index.css'; 

const App = () => {
  const [activeNavItem, setActiveNavItem] = useState('upload');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-2">
          <div className="sidebar bg-dark">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${
                    activeNavItem === 'upload' ? 'active' : ''
                  }`}
                  onClick={() => handleNavItemClick('upload')}
                >
                  Upload CSV
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${
                    activeNavItem === 'fetch' ? 'active' : ''
                  }`}
                  onClick={() => handleNavItemClick('fetch')}
                >
                  Fetch CSV Data
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          {activeNavItem === 'upload' && <FileUploadComponent />}
          {activeNavItem === 'fetch' && <FetchCSVDataComponent />}
        </div>
      </div>
    </div>
  );
};

export default App;
