import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      changeUserStatus
    } = this.props;
    return (
      <section className='AdminPanel container'>
        <h3>Admin Panel</h3>
        <ActionBtn title='To admin' handler={userToAdmin} />
        <ActionBtn title='To user' handler={adminToUser} />
        <ActionBtn title='Change status' handler={changeUserStatus} />
        <ActionBtn title='Delete' handler={deleteUsers} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
              </th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Fanfics count (later)</th>
              <th>Comments count (later)</th>
              <th>Register datetime (later)</th>
              <th>Last login (later)</th>
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
                  <a href={user.link}>{user.username}</a>
                </td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = state => state.adminPage;

export default connect(mapStateToProps, adminActions)(AdminPanel);
