import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socket from './socket';
import * as preloadActions from './redux/actions/preloadActions';
import {
  updateLikes,
  updateStars,
  updateComments
} from './redux/actions/fanficActions';

import Spinner from './components/common/Spinner/';
import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import SearchResult from './components/SearchResult/';
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
    this.getConst = this.props.actions.getConst;
    this.getTags = this.props.actions.getTags;
    this.updateLikes = this.props.actions.updateLikes;
    this.updateStars = this.props.actions.updateStars;
    this.updateComments = this.props.actions.updateComments;
  }

  componentDidMount() {
    document.title = 'Mordor - fanfics home';
    this.getConst();
    this.getTags();
    const { isAuthenticated, fanfic } = this.props;

    socket.on('newLikesCount', data => {
      const needToHandleFanficUpdates =
        isAuthenticated &&
        fanfic._id !== undefined &&
        fanfic.chapters.some(el => el._id === data.chapterId);
      if (needToHandleFanficUpdates) {
        this.updateLikes(data);
      }
    });

    socket.on('newRate', data => {
      const needToHandleFanficUpdates =
        isAuthenticated &&
        fanfic._id !== undefined &&
        fanfic._id === data.fanficId;
      if (needToHandleFanficUpdates) {
        this.updateStars(data);
      }
    });

    socket.on('updateComments', data => {
      const needToHandleFanficUpdates =
        isAuthenticated &&
        fanfic._id !== undefined &&
        fanfic._id === data.fanficId;
      if (needToHandleFanficUpdates) {
        this.updateComments(data);
      }
    });
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
          <Route
            path='/admin'
            render={matchProps => <AdminPanel {...matchProps} />}
          />
          <Route
            path='/profile/:id'
            render={matchProps => <Profile {...matchProps} />}
          />
          <Route
            path='/fanfic/:mode/:id'
            render={matchProps => (
              <Fanfic {...matchProps} userId={this.userId} />
            )}
          />
          <Route
            path='/search/:mode/:param'
            render={matchProps => <SearchResult {...matchProps} />}
          />
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  fanfic: state.fanfic
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...preloadActions, updateLikes, updateStars, updateComments },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
