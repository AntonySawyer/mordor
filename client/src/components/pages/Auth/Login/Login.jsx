import React from 'react';
import ActionBtn from '../../../common/ActionBtn/';
import './Login.css';

export default () => {
  return (
    <div className='wrapper'>
      <h3 className='row justify-content-center'>Please, login</h3>
      <form className='needs-validation justify-content-center' noValidate>
        <div className='form-group'>
          <label htmlFor='inputEmail'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            placeholder='Enter email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordInput'>Password</label>
          <input
            type='password'
            className='form-control'
            id='passwordInput'
            placeholder='Password'
            required
          />
        </div>
        <ActionBtn title='Login' />
      </form>
    </div>
  );
};
