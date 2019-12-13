import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
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

    if (emailValid && passValid) {
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
      emailValid: !emailValid,
      usernameValid: !usernameValid,
      passValid
    });

    if (!emailValid && !usernameValid && passValid) {
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
    const { t } = this.props;
    const mode = this.state.isLogin ? t('Auth.login') : t('Auth.register');
    const authHandler = this.state.isLogin
      ? this.login.bind(this)
      : this.register.bind(this);
    return (
      <section className='container'>
        <h3 className='row justify-content-center'>{mode}</h3>
        <ActionBtn
          title={`${t('Auth.redirectGreet')} ${this.state.isLogin ? t('Auth.register') : t('Auth.login')}`}
          handler={this.changePage.bind(this)}
        />
        <div className='wrapper'>
          <form className='needs-validation justify-content-center' noValidate>
            <div className='form-group'>
              <Input type='email' label={t('Auth.emailInput')} />
              {!this.state.emailValid && (
                <span>{t('Auth.emailInvalid')}
                </span>
              )}
            </div>
            <div className='form-group'>
              <Input type='password' label={t('Auth.passwordInput')} />
              {!this.state.passValid && (
                <span>{t('Auth.passwordInvalid')}</span>
              )}
            </div>
            {!this.state.isLogin && (
              <div className='col-md-auto'>
                <label htmlFor='username'>{t('Auth.username')}</label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' id='inputGroupPrepend'>
                      @
                    </span>
                  </div>
                  <Input
                    type='text'
                    name='username'
                    placeholder={t('Auth.usernameInput')}
                  />
                  {!this.state.usernameValid && (
                    <span>{t('Auth.usernameInvalid')}</span>
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

export default withNamespaces('common')(Auth);
