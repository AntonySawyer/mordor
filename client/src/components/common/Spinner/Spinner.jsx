import React from 'react';
import './Spinner.css';

export default ({ type, className, handler, title }) => {
  return (
    <div class='d-flex justify-content-center spinner'>
      <div
        class='spinner-border text-danger'
        role='status'
      >
        <span class='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
