import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/';
import './NavBar.css';

export default () => {
  return (
    <header className='NavBar container'>
      <nav className='navbar navbar-expand-lg navbar-light row justify-content-center'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/auth'>
                SignIn/Register
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/admin'>
                Admin panel
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/profile'>
                Profile
              </NavLink>
            </li>
          </ul>

          <SearchBar />
        </div>
      </nav>
    </header>
  );
};
