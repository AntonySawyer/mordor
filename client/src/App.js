import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as preloadActions from './redux/actions/preloadActions';


import Spinner from './components/common/Spinner/';
import './App.css';

import Register from './components/Register';
import Login from './components/Login';

const Home = lazy(() => import('./components/Home/'));
const NavBar = lazy(() => import('./components/NavBar/'));
const AdminPanel = lazy(() => import('./components/AdminPanel/'));
const Profile = lazy(() => import('./components/Profile/'));
const Fanfic = lazy(() => import('./components/Fanfic/'));


class App extends React.Component {
  constructor(props) {
    super(props);

    this.isAuth = this.props.isAuthenticated;
    this.isAdmin = this.props.user.role === 'admin';
    this.userId = this.props.user.id;

    this.getProfile = this.props.getProfile;
    this.getUsers = this.props.getUsers;
    this.getRated = this.props.getRated;
    this.getLastUpdated = this.props.getLastUpdated;
  }

  componentDidMount() {
    document.title = 'Mordor - fanfics home';
    this.props.getConst();
    this.props.getTags();
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
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          {this.isAdmin ? this.adminPreload() : null}
          {this.isAuth ? this.profilePreload() : null}
          <Route
            path='/fanfic/:mode/:id'
            render={matchProps => (
              <Fanfic {...matchProps} userId={this.userId} />
            )}
          />
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps, preloadActions)(App);
