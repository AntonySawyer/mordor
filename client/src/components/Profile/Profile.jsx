import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as profileActions from '../../redux/actions/profileActions';

import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      userdata,
      achieves,
      fanfics,
      deleteFanfic,
      editFanfic,
      createFanfic
    } = this.props;
    return (
      <section className='profile container'>
        <h3>Your profile</h3>
        <section className='row'>
          <article className='col'>
            <ul>
              <li>{`Username: ${userdata.username}`}</li>
              <li>Something else</li>
              <li>And else</li>
              <li>Maybe password reset btn(?)</li>
            </ul>
          </article>
          <article className='col'>
            {achieves.map(el => (
              <p key={el.id}>{el.title}</p>
            ))}
          </article>
        </section>
        <ActionBtn title='Create new' handler={createFanfic} />
        <ActionBtn title='Delete' handler={deleteFanfic} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
              </th>
              <th>Title</th>
              <th>Link</th>
              <th>Edit</th>
              <th>Create datetime (later)</th>
            </tr>
          </thead>
          <tbody>
            {fanfics.map(el => (
              <tr key={el.id}>
                <td>
                  <input
                    type='checkbox'
                    onChange={setIndeterminate}
                    value={`fanfic_${el.id}`}
                  />
                </td>
                <td>{el.title}</td>
                <td>
                  <a href={el.link}>Read</a>
                </td>
                <td>
                  <ActionBtn title='Edit' handler={editFanfic} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = state => state.profilePage;

export default connect(mapStateToProps, profileActions)(Profile);
