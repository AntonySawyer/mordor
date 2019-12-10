import React from "react";
import ActionBtn from "../common/ActionBtn/";
import Input from "../common/Input/";

import "./SearchBar.css";

export default () => {
  return (
    <div className='input-group mb-3'>
      <Input type='search' placeholder='Search' />
      <div className='input-group-append'>
        <ActionBtn title='Search' />
      </div>
    </div>
  );
};
