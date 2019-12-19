import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from '../SearchBar/';
import LangSwitch from '../LangSwitch/';
import ThemeSwitch from '../ThemeSwitch/';
import { getProfile } from '../../redux/actions/preloadActions';
import { logoutUser } from '../../redux/actions/authentication';
import './NavBar.css';

function NavBar(props) {
  const { t, isAuth, isAdmin, currentId, actions, getUsers } = props;

  const { isAuthenticated, user } = props.auth;

  function onLogout(e) {
    e.preventDefault();
    actions.logoutUser(props.history);
  }

  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <a href='#' className='nav-link' onClick={onLogout.bind(this)}>
        <img
          src={user.avatar}
          alt={user.name}
          title={user.name}
          className='rounded-circle'
          style={{ width: '25px', marginRight: '5px' }}
        />
        Logout
      </a>
    </ul>
  );
  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/register'>
          Sign Up
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/login'>
          Sign In
        </NavLink>
      </li>
    </ul>
  );
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

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {isAuthenticated ? authLinks : guestLinks}
        </div>

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
                  onClick={() => actions.getProfile(currentId)}
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

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getProfile, logoutUser }, dispatch)
  };
};

export default withNamespaces('common')(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))
);
