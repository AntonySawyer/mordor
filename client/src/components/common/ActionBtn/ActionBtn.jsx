import React from 'react';
import './ActionBtn.css';

export default ({type, className, handler, title}) => {
  return (
    <button
      type='button'
      className={className || 'btn btn-outline-info'}
      onClick={handler}
    >
      {title}
    </button>
  );
};
