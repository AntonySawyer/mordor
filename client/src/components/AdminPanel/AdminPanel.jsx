import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import * as adminActions from '../../redux/actions/adminActions';
import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './AdminPanel.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      userlist,
      deleteUsers,
      userToAdmin,
      adminToUser,
      changeUserStatus,
      t,
      profilePreload
    } = this.props;
    return (
      <section className='AdminPanel container'>
        <h3>{t('Admin.title')}</h3>
        <ActionBtn title={t('Admin.toAdmin')} handler={userToAdmin} />
        <ActionBtn title={t('Admin.toUser')} handler={adminToUser} />
        <ActionBtn title={t('Admin.changeStatus')} handler={changeUserStatus} />
        <ActionBtn title={t('Admin.delete')} handler={deleteUsers} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
              </th>
              <th>{t('Admin.username')}</th>
              <th>{t('Admin.email')}</th>
              <th>{t('Admin.role')}</th>
              <th>{t('Admin.status')}</th>
              <th>{t('Admin.fanficCount')}</th>
              <th>{t('Admin.commentCount')}</th>
              <th>{t('Admin.registerDate')}</th>
              <th>{t('Admin.lastLoginDate')}</th>
            </tr>
          </thead>
          <tbody>
            {userlist.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type='checkbox'
                    onChange={setIndeterminate}
                    value={`user_${user.id}`}
                  />
                </td>
                <td>
                  <NavLink className='nav-link' to={`/profile/${user.id}`} onClick={() => profilePreload(user.id)}>
                    {user.username}
                  </NavLink>
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.role === 'Admin' ? t('Admin.admin') : t('Admin.user')}
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
    );
  }
}

const mapStateToProps = state => state.adminPage;

export default withNamespaces('common')(
  connect(mapStateToProps, adminActions)(AdminPanel)
);
