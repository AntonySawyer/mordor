import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/';
import Auth from './components/Auth/';
import Profile from './components/Profile/';
import AdminPanel from './components/AdminPanel/';
// import NavBar from './components/NavBar/';
import Spinner from './components/common/Spinner/';
import './App.css';
const NavBar = lazy(() => import('./components/NavBar/'));

export default () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route path='/auth' component={Auth} />
        <Route path='/admin' component={AdminPanel} />
        <Route path='/profile' component={Profile} />
      </Suspense>
    </Router>
  );
};
