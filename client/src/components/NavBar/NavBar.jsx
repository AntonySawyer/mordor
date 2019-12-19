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
  const { t, actions, getUsers, auth } = props;
  const { isAuthenticated, user } = auth;
  const isAdmin = user.role === 'admin';

  function onLogout(e) {
    e.preventDefault();
    actions.logoutUser(props.history);
  }

  const commonLinks = (
    <li className='nav-item'>
      <NavLink className='nav-link' to='/'>
        {t('NavBar.home')}
      </NavLink>
    </li>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/register'>
          {t('NavBar.register')}
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/login'>
          {t('NavBar.login')}
        </NavLink>
      </li>
    </ul>
  );

  const authLinks = (
    <>
      <li>
        <NavLink
          className='nav-link'
          to={`/profile/${user.id}`}
          onClick={() => actions.getProfile(user.id)}
        >
          <img
            src={user.avatar}
            alt={user.username}
            title={user.username}
            className='rounded-circle'
            style={{ width: '25px', marginRight: '5px' }}
          />
          {`${user.username} - ${t('NavBar.profile')}`}
        </NavLink>
      </li>
      <li className='nav-item'>
        <a href='#' className='nav-link' onClick={onLogout.bind(this)}>
          {t('NavBar.logout')}
        </a>
      </li>
    </>
  );

  const adminLinks = (
    <li className='nav-item'>
      <NavLink className='nav-link' to='/admin' onClick={getUsers}>
        {t('NavBar.adminPanel')}
      </NavLink>
    </li>
  );

  return (
    <header className='NavBar container'>
      <nav className='navbar navbar-expand-lg navbar-light row justify-content-center'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarToggler'
          aria-controls='navbarToggler'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarToggler'>
          <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            {isAuthenticated ? authLinks : guestLinks}
            {commonLinks}
            {isAdmin && adminLinks}
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
