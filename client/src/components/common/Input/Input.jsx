import React from 'react';
import './Input.css';

export default ({type, name, id, label, required, placeholder}) => {
  const requiredBool = required === false ? false : true;
  return (
    <>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name ? name : type}
        id={id ? id : (name ? name : type)}
        className='form-control'
        autoComplete='on'
        placeholder={placeholder ? placeholder : label}
        required={requiredBool}
        />
    </>
  );
};
