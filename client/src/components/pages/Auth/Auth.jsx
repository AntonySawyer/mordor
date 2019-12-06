import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='container'>
        <Login />
        <Register />
      </section>
    );
  }
}

export default Auth;
