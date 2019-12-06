import React, { Component } from 'react';
import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='profile container'>
        <h3>Your profile</h3>
        <section className='row'>
          <article className='col'>
            <ul>
              <li>Name: some name</li>
              <li>Something else</li>
              <li>And else</li>
              <li>Maybe password reset btn(?)</li>
            </ul>
          </article>
          <article className='col'>
            <p>I'm achieve</p>
            <p>I'm achieve</p>
            <p>I'm achieve</p>
          </article>
        </section>
        <ActionBtn title='Create new' />
        <ActionBtn title='Edit' />
        <ActionBtn title='Delete' />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
              </th>
              <th>Title</th>
              {/* join with prev? */}
              <th>Read mode</th>
              <th>Create datetime (later)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>Best of the best</td>
              <td>
                <a href='#'>Read</a>
              </td>
              <td>21.12.2019</td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>Cool story</td>
              <td>
                <a href='#'>Read mode</a>
              </td>
              <td>28.03.2018</td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' onChange={setIndeterminate} />
              </td>
              <td>Nothing else matter</td>
              <td>
                <a href='#'>Read</a>
              </td>
              <td>06.11.2019</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Profile;
