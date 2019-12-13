import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as preloadActions from "./redux/actions/preloadActions";

import Home from './components/Home/';
import Auth from './components/Auth/';
import Spinner from './components/common/Spinner/';
import './App.css';
const NavBar = lazy(() => import('./components/NavBar/'));
const AdminPanel = lazy(() => import('./components/AdminPanel/'));
const Profile = lazy(() => import('./components/Profile/'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isAuth = this.props.isAuth;
    this.isAdmin = this.props.role === 'admin';
    this.getProfile = this.props.getProfile;
    this.getUsers = this.props.getUsers;
    this.userId = this.props.userId;
  }
  
  componentWillMount() {
    console.log(this.props);
    console.log('cwm');
  }

  adminPreload() {
    console.log('admin preload');
    this.getUsers();
    return <Route path='/admin' render={() => <AdminPanel profilePreload={this.profilePreload.bind(this)} />} />;
  }

  profilePreload(id = this.userId) {
    console.log(this.userId);
    console.log(id);
    console.log('profile preload');
    this.getProfile(id);
    return <Route path='/profile/:id' component={Profile} />;
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<Spinner />}>
          <NavBar isAuth={this.isAuth} isAdmin={this.isAdmin} currentId={this.userId} profilePreload={this.profilePreload.bind(this)} />
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={Auth} />
          {this.isAdmin ? this.adminPreload() : null}
          {this.isAuth ? this.profilePreload() : null}
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => state.loginStatus;

export default connect(mapStateToProps, preloadActions)(App);
