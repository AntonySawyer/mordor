import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

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
      createFanfic,
      t,
      profilePreload,
      match
    } = this.props;
    const id = match.params.id;
    if (id !== userdata.id) {
      profilePreload(id);
    }
    return (
      <section className='profile container'>
        <h3>{t('Profile.title')}</h3>
        <section className='row'>
          <article className='col'>
            <ul>
              <li>{`${t('Profile.username')}: ${userdata.username}`}</li>
              <li>{`${t('Profile.email')}: ${userdata.email}`}</li>
              <li>{`${t('Profile.role')}: ${
                userdata.role === 'admin'
                  ? t('Profile.admin')
                  : t('Profile.user')
              }`}</li>
              <li>Maybe password reset btn(?)</li>
            </ul>
          </article>
          <article className='col'>
            {achieves.map(el => (
              <p key={el.id}>{el.title}</p>
            ))}
          </article>
        </section>
        <ActionBtn title={t('Profile.create')} handler={createFanfic} />
        <ActionBtn title={t('Profile.delete')} handler={deleteFanfic} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
              </th>
              <th>{t('Profile.fanficTitle')}</th>
              <th>{t('Profile.link')}</th>
              <th>{t('Profile.edit')}</th>
              <th>{t('Profile.createdAt')}</th>
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
                  <a href={el.link}>{t('Profile.read')}</a>
                </td>
                <td>
                  <ActionBtn title={t('Profile.edit')} handler={editFanfic} />
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

export default withNamespaces('common')(
  connect(mapStateToProps, profileActions)(Profile)
);
