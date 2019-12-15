import React from 'react';
import { NavLink } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar/';
import LangSwitch from '../LangSwitch/';
import ThemeSwitch from '../ThemeSwitch/';
import * as preloadActions from '../../redux/actions/preloadActions';
import './NavBar.css';

function NavBar(props) {
  const { t, isAuth, isAdmin, currentId, getProfile, getUsers } = props;
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
                {t('NavBar.home')}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/auth'>
                {t('NavBar.register')}
              </NavLink>
            </li>
            {isAdmin && isAuth ? (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/admin' onClick={getUsers}>
                  {t('NavBar.adminPanel')}
                </NavLink>
              </li>
            ) : null}
            {isAuth ? (
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to={`/profile/${currentId}`}
                  onClick={() => getProfile(currentId)}
                >
                {t('NavBar.profile')}
                </NavLink>
              </li>
            ) : null}
            <li>
              <LangSwitch />
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}

export default withNamespaces('common')(connect(null, preloadActions)(NavBar));
