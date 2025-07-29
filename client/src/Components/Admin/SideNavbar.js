import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faQuestionCircle, faShoppingCart, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo-without-bg.png'; // Update to your logo path
import './SideNavbar.css';

const SideNavbar = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      {/* <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div> */}

      {/* Navigation Links */}
      <ul className="nav-list">
        {[
          { name: 'Dashboard', icon: faTachometerAlt },
          { name: 'Products', icon: faBoxOpen },
          { name: 'Orders', icon: faShoppingCart },
          { name: 'Inventry', icon: faShoppingCart },
          { name: 'Support', icon: faQuestionCircle },
        ].map((item, index) => {
          const link = item.name === 'Dashboard' ? 'sellerdashboard' : item.name.toLowerCase();

          return (
            <li key={index} className="nav-item">
              <NavLink
                to={`/admin/${link}`}
                className={({ isActive }) =>
                  isActive ? 'nav-links nav-links-active' : 'nav-links'
                }
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
