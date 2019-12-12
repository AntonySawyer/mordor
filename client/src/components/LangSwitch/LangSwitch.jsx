import React from 'react';
import { connect } from 'react-redux';
import { NamespacesConsumer, withNamespaces } from 'react-i18next';
import './LangSwitch.css';

const LangSwitch = React.memo(props => {
  function onChange(lng, i18n) {
    i18n.changeLanguage(lng);
  }
  
  const { t, i18n } = props;
  const data = i18n.getDataByLanguage(i18n.language);

  return (
    <NamespacesConsumer ns={['common']} wait={true}>
      {(t, { i18n, ready }) => (
        <div class='input-group mb-3'>
          <div class='input-group-prepend'>
            <label class='input-group-text' for='inputGroupSelect01'>
              {t('NavBar.lang')}
            </label>
          </div>
          <select
            class='custom-select LanguageSwitcher'
            id='inputGroupSelect01'
            defaultValue={props.lang}
            onChange={e => onChange(e.target.value, i18n)}
          >
            <option value='en-US'>English</option>
            <option value='ru-RU'>Русский</option>
          </select>
        </div>
      )}
    </NamespacesConsumer>
  );
});

const mapStateToProps = state => {
  return {
    lang: state.i18next.language
  };
};

export default withNamespaces('common')(connect(mapStateToProps)(LangSwitch));
