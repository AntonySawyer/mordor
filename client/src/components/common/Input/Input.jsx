import React from 'react';
import './Input.css';

export default ({type, value, name, id, label, onChange, required, placeholder}) => {
  const requiredBool = required === false ? false : true;
  return (
    <>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name ? name : type}
        id={id ? id : (name ? name : type)}
        value={value}
        onChange={onChange}
        className='form-control'
        autoComplete='on'
        placeholder={placeholder ? placeholder : label}
        required={requiredBool}
        />
    </>
  );
};
