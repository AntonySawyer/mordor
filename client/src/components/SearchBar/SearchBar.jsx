import React from "react";
import { withNamespaces } from 'react-i18next';
import ActionBtn from "../common/ActionBtn/";
import Input from "../common/Input/";

import "./SearchBar.css";

function SeacrhBar(props) {
    const { t, i18n } = props;
  const data = i18n.getDataByLanguage(i18n.language);
  return (
    <div className='input-group mb-3'>
      <Input type='search' placeholder={t('NavBar.search')} />
      <div className='input-group-append'>
        <ActionBtn title={t('NavBar.search')} />
      </div>
    </div>
  );
};

export default withNamespaces('common')(SeacrhBar);