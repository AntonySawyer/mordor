import React from 'react';
import './ActionBtn.css';

export default props => {
  return (
    <button
      type='button'
      className={props.className || 'btn btn-outline-info'}
      onClick={props.handler}
    >
      {props.title}
    </button>
  );
};
