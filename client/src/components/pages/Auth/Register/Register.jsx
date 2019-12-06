import React from 'react';
import ActionBtn from '../../../common/ActionBtn/';
import './Register.css';

export default () => {
  return (
    <div className='wrapper'>
      <h3 className='row justify-content-center'>or register</h3>
      <form className='needs-validation justify-content-center' noValidate>
        <div className='form-group'>
          <label for='inputEmail'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            required
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label for='passwordInput'>Password</label>
          <input
            type='password'
            className='form-control'
            id='passwordInput'
            placeholder='Password'
            required
          />
        </div>
        <div className='col-md-auto'>
          <label for='usernameInput'>Username</label>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroupPrepend'>
                @
              </span>
            </div>
            <input
              type='text'
              className='form-control'
              id='usernameInput'
              placeholder='Username'
              aria-describedby='inputGroupPrepend'
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='invalidCheck'
              required
            />
            <label className='form-check-label' for='invalidCheck'>
              Agree to terms and conditions
            </label>
          </div>
        </div>
        <ActionBtn title='Register' />
      </form>
    </div>
  );
};
