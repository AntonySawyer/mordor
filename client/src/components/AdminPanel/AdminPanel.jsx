import React, { Component } from 'react';
import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from "../../utils/checkboxWorker";
import './AdminPanel.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='AdminPanel container'>
        <h3>Admin Panel</h3>
        <ActionBtn title='Promote' />
        <ActionBtn title='Unblock' />
        <ActionBtn title='Block' />
        <ActionBtn title='Delete' />
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
              <th>Username</th>
              {/* join with prev? */}
              <th>Profile link</th>
              <th>Role</th>
              <th>Is blocked</th>
              <th>Fanfics count (later)</th>
              <th>Comments count (later)</th>
              <th>Register datetime (later)</th>
              <th>Last login (later)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>User1</td>
              <td>
                <a href='#'>See profile </a>
              </td>
              <td>Admin</td>
              <td>active</td>
              <td>2</td>
              <td>672</td>
              <td>04.09.2016</td>
              <td>21.12.2019</td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>CatsLover</td>
              <td>
                <a href='#'>See profile</a>
              </td>
              <td>User</td>
              <td>active</td>
              <td>3</td>
              <td>12</td>
              <td>04.11.2017</td>
              <td>28.03.2018</td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>ImpossibleShield</td>
              <td>
                <a href='#'>See profile</a>
              </td>
              <td>User</td>
              <td>blocked</td>
              <td>0</td>
              <td>93</td>
              <td>13.08.2019</td>
              <td>06.11.2019</td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>LolBlob</td>
              <td>
                <a href='#'>See profile</a>
              </td>
              <td>Admin</td>
              <td>active</td>
              <td>0</td>
              <td>1</td>
              <td>06.12.2019</td>
              <td>08.12.2019</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default AdminPanel;
