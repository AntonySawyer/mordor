import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as preloadActions from './redux/actions/preloadActions';

import Home from './components/Home/';
import Auth from './components/Auth/';
import Spinner from './components/common/Spinner/';
import './App.css';
const NavBar = lazy(() => import('./components/NavBar/'));
const AdminPanel = lazy(() => import('./components/AdminPanel/'));
const Profile = lazy(() => import('./components/Profile/'));
const Fanfic = lazy(() => import('./components/Fanfic/'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isAuth = this.props.isAuth;
    this.isAdmin = this.props.role === 'admin';
    this.getProfile = this.props.getProfile;
    this.getUsers = this.props.getUsers;
    this.userId = this.props.userId;
  }

  adminPreload() {
    this.getUsers();
    return (
      <Route
        path='/admin'
        render={() => (
          <AdminPanel profilePreload={this.profilePreload.bind(this)} />
        )}
      />
    );
  }

  profilePreload(id = this.userId) {
    if (id === this.userId || this.isAdmin) {
      this.getProfile(id);
      return (
        <Route
          path='/profile/:id'
          component={matchProps => (
            <Profile
              {...matchProps}
              profilePreload={this.profilePreload.bind(this)}
            />
          )}
        />
      );
    }
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<Spinner />}>
          <NavBar
            isAuth={this.isAuth}
            isAdmin={this.isAdmin}
            currentId={this.userId}
          />
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={Auth} />
          {this.isAdmin ? this.adminPreload() : null}
          {this.isAuth ? this.profilePreload() : null}
          <Route path='/fanfic/read' component={() => <Fanfic mode='read' />} />
          <Route path='/fanfic/edit' component={() => <Fanfic mode='edit' />} />
          <Route path='/fanfic/create/new' component={() => <Fanfic mode='create' />} />
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => state.loginStatus;

export default connect(mapStateToProps, preloadActions)(App);
