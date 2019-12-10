import React, { Component } from 'react';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import UserdataValidator from '../../utils/userdataValidator';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      emailValid: true,
      usernameValid: true,
      passValid: true
    };
  }

  async login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { emailValid, passValid } = await UserdataValidator(email, password);
    this.setState({ emailValid, passValid });

    if (!emailValid && passValid) {
      this.sendData('/login', JSON.stringify({ email, password }));
    }
  }

  async register() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const { emailValid, usernameValid, passValid } = await UserdataValidator(
      email,
      password,
      username
    );
    this.setState({
      emailValid,
      usernameValid,
      passValid
    });

    if (emailValid && usernameValid && passValid) {
      this.sendData('/register', JSON.stringify({ email, username, password }));
    }
  }

  sendData(endpoint, body) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });
  }

  changePage() {
    this.setState(prevState => (prevState.isLogin = !prevState.isLogin));
  }

  render() {
    const mode = this.state.isLogin ? 'Login' : 'Register';
    const authHandler = this.state.isLogin
      ? this.login.bind(this)
      : this.register.bind(this);
    return (
      <section className='container'>
        <h3 className='row justify-content-center'>{mode}</h3>
        <ActionBtn
          title={`Go to ${this.state.isLogin ? 'register' : 'login'}`}
          handler={this.changePage.bind(this)}
        />
        <div className='wrapper'>
          <form className='needs-validation justify-content-center' noValidate>
            <div className='form-group'>
              <Input type='email' label='Enter email' />
              {!this.state.emailValid && (
                <span>Invalid value, please, check your email or try to login</span>
              )}
            </div>
            <div className='form-group'>
              <Input type='password' label='Enter password' />
              {!this.state.passValid && (
                <span>Password length must be greater then 3</span>
              )}
            </div>
            {!this.state.isLogin && (
              <div className='col-md-auto'>
                <label htmlFor='username'>Username</label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' id='inputGroupPrepend'>
                      @
                    </span>
                  </div>
                  <Input
                    type='text'
                    name='username'
                    placeholder='Enter username'
                  />
                  {!this.state.usernameValid && (
                    <span>This username is not unique or empty</span>
                  )}
                </div>
              </div>
            )}

            <ActionBtn title={mode} handler={authHandler} />
          </form>
        </div>
      </section>
    );
  }
}

export default Auth;
