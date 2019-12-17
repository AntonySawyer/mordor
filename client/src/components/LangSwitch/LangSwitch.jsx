import React from 'react';
import { connect } from 'react-redux';
import { NamespacesConsumer, withNamespaces } from 'react-i18next';
import Select from '../common/Select/';
import './LangSwitch.css';

const LangSwitch = React.memo(props => {
  function onChange(lng, i18n) {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  }

  const { t, i18n } = props;

  return (
    <NamespacesConsumer ns={['common']} wait={true}>
      {(t, { i18n, ready }) => (
        <Select
          id='LanguageSwitcher'
          label={t('NavBar.lang')}
          defaultValue={props.lang}
          values={[
            { title: 'English', value: 'en-US' },
            { title: 'Русский', value: 'ru-RU' }
          ]}
          handler={e => onChange(e.target.value, i18n)}
        />
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
