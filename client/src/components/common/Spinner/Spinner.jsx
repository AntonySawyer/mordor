import React from 'react';
import './Spinner.css';

export default ({ type, className, handler, title }) => {
  return (
    <div className='d-flex justify-content-center spinner'>
      <div
        className='spinner-border text-danger'
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
