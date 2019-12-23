import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import * as adminActions from '../../redux/actions/adminActions';
import { getProfile } from '../../redux/actions/profileActions';
import ActionBtn from '../common/ActionBtn/';
import Spinner from '../common/Spinner/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './AdminPanel.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.user.role !== 'admin') {
      this.props.history.push('/');
    } else {
      this.props.getUsers();
    }
  }

  render() {
    const {
      userlist,
      deleteUsers,
      userToAdmin,
      adminToUser,
      blockUser,
      unblockUser,
      t
    } = this.props;

    const dataIsReady = userlist !== undefined;
    return (
      <>
        {!dataIsReady && <Spinner />}
        {dataIsReady && (
          <section className='AdminPanel container'>
            <h3>{t('Admin.title')}</h3>
            <ActionBtn title={t('Admin.toAdmin')} handler={userToAdmin} />
            <ActionBtn title={t('Admin.toUser')} handler={adminToUser} />
            <ActionBtn title={t('Admin.block')} handler={blockUser} />
            <ActionBtn title={t('Admin.unblock')} handler={unblockUser} />
            <ActionBtn title={t('Admin.delete')} handler={deleteUsers} />
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>
                    <input
                      type='checkbox'
                      id='mainCheckbox'
                      onChange={checkAll}
                    />
                  </th>
                  <th>{t('Admin.username')}</th>
                  <th>{t('Admin.email')}</th>
                  <th>{t('Admin.role')}</th>
                  <th>{t('Admin.status')}</th>
                </tr>
              </thead>
              <tbody>
                {userlist.map(user => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type='checkbox'
                        onChange={setIndeterminate}
                        value={`user_${user._id}`}
                      />
                    </td>
                    <td>
                      <NavLink className='nav-link' to={`/profile/${user._id}`}>
                        {user.username}
                      </NavLink>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.role === 'admin'
                        ? t('Admin.admin')
                        : t('Admin.user')}
                    </td>
                    <td>
                      {user.status === 'active'
                        ? t('Admin.active')
                        : t('Admin.blocked')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.adminPage,
  auth: state.auth
});

export default withNamespaces('common')(
  connect(mapStateToProps, adminActions)(AdminPanel)
);
