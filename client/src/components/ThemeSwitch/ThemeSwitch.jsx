import React from 'react';
import { connect } from 'react-redux';
import { NamespacesConsumer, withNamespaces } from 'react-i18next';
import * as syncActions from '../../redux/actions/syncActions';
import './ThemeSwitch.css';

const ThemeSwitch = React.memo(props => {
  const { t, i18n, setTheme } = props;
  return (
    <NamespacesConsumer ns={['common']} wait={true}>
      {(t, { i18n, ready }) => (
        <div class='input-group mb-3'>
          <div class='input-group-prepend'>
            <label class='input-group-text' for='themeSelect'>
              {t('NavBar.theme')}
            </label>
          </div>
          <select
            class='custom-select LanguageSwitcher'
            id='themeSelect'
            defaultValue={props.activeTheme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value='dark-body'>{t('NavBar.dark')}</option>
            <option value=''>{t('NavBar.light')}</option>
          </select>
        </div>
      )}
    </NamespacesConsumer>
  );
});

const mapStateToProps = state => state.syncParams;

export default withNamespaces('common')(connect(mapStateToProps, syncActions)(ThemeSwitch));
