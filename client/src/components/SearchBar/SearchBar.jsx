import React from "react";
import ActionBtn from "../common/ActionBtn/";
import "./SearchBar.css";

export default () => {
  return (
    <div className='input-group mb-3'>
      <input
        aria-label='Search'
        className='form-control'
        placeholder='Search'
        type='search'
      />
      <div className='input-group-append'>
        <ActionBtn title='Search' />
      </div>
    </div>
  );
};
