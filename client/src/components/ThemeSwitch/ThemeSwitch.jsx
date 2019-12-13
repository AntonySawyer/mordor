import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as syncActions from '../../redux/actions/syncActions';
import './ThemeSwitch.css';

const ThemeSwitch = React.memo(props => {
  const { t, setTheme } = props;
  return (
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <label className='input-group-text' htmlFor='themeSelect'>
              {t('NavBar.theme')}
            </label>
          </div>
          <select
            className='custom-select LanguageSwitcher'
            id='themeSelect'
            defaultValue={props.activeTheme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value='dark-body'>{t('NavBar.dark')}</option>
            <option value=''>{t('NavBar.light')}</option>
          </select>
        </div>
      )}
  );

const mapStateToProps = state => state.syncParams;

export default withNamespaces('common')(connect(mapStateToProps, syncActions)(ThemeSwitch));
