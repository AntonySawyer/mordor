import React from 'react';
import './Select.css';

export default ({ id, label, defaultValue, values, handler }) => {
  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <label className='input-group-text' htmlFor={id}>
          {label}
        </label>
      </div>
      <select
        className='custom-select'
        id={id}
        value={defaultValue}
        onChange={handler}
      >
        {values.map((el, index) => (
          <option key={index} value={el.value}>
            {el.title}
          </option>
        ))}
      </select>
    </div>
  );
};
