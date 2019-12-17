import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as syncActions from '../../redux/actions/syncActions';
import Select from '../common/Select/';
import './ThemeSwitch.css';

const ThemeSwitch = React.memo(props => {
  const { t, setTheme } = props;
  return (
    <Select
      id='themeSelect'
      label={t('NavBar.theme')}
      defaultValue={props.activeTheme}
      values={[
        { title: t('NavBar.dark'), value: 'dark-body' },
        { title: t('NavBar.light'), value: '' }
      ]}
      handler={e => setTheme(e.target.value)}
    />
  );
});

const mapStateToProps = state => state.syncParams;

export default withNamespaces('common')(
  connect(mapStateToProps, syncActions)(ThemeSwitch)
);
