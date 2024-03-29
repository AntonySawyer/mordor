import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import FilterableTable from 'react-filterable-table';
import dateFormat from '../../utils/dateFormat';
import * as profileActions from '../../redux/actions/profileActions';
import ActionBtn from '../common/ActionBtn/';
import Spinner from '../common/Spinner/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const isAdmin = this.props.auth.user.role === 'admin'
    const isOwner = this.props.match.params.id === this.props.auth.user.id
    if (!isAdmin && !isOwner) {
      this.props.history.push('/login');
    }
  }

  fanficAction(mode, id) {
    this.props.history.push(`/fanfic/${mode}/${id}`);
  }

  render() {
    console.log(this.props);
    const {
      userdata,
      achieves,
      fanfics,
      deleteFanfic,
      t,
      getProfile,
      match
    } = this.props;

    const { id } = match.params;
    if (userdata === undefined || id !== userdata.id) {
      getProfile(id);
    }

    const data = [];

    if (fanfics !== undefined) {
      fanfics.map(el =>
        data.push({
          checkbox: (
            <input
              type='checkbox'
              onChange={setIndeterminate}
              value={`fanfic_${el.id}`}
            />
          ),
          fanficTitle: el.title,
          link: (
            <ActionBtn
              title={t('Profile.read')}
              handler={this.fanficAction.bind(this, 'read', el.id)}
            />
          ),
          edit: (
            <ActionBtn
              title={t('Profile.edit')}
              handler={this.fanficAction.bind(this, 'edit', el.id)}
            />
          ),
          createdAt: dateFormat(el.datestamp, this.props.lng)
        })
      );
    }

    const fields = [
      {
        name: 'checkbox',
        displayName: (
          <input type='checkbox' id='mainCheckbox' onChange={checkAll} />
        ),
        inputFilterable: false,
        sortable: false
      },
      {
        name: 'fanficTitle',
        displayName: t('Profile.fanficTitle'),
        inputFilterable: true,
        sortable: true
      },
      {
        name: 'link',
        displayName: t('Profile.link'),
        inputFilterable: false,
        exactFilterable: false,
        sortable: false
      },
      {
        name: 'edit',
        displayName: t('Profile.edit'),
        inputFilterable: false,
        exactFilterable: false,
        sortable: false
      },
      {
        name: 'createdAt',
        displayName: t('Profile.createdAt'),
        inputFilterable: true,
        exactFilterable: true,
        sortable: true
      }
    ];

    const dataIsReady = userdata !== undefined;

    return (
      <section className='profile container'>
        <h3>{t('Profile.title')}</h3>
        {!dataIsReady && <Spinner />}
        {dataIsReady && (
          <section className='row'>
            <article className='col'>
              <div className='card mb-3'>
                <div className='row no-gutters'>
                  <div className='col-md-2'>
                    <img
                      className='card-img-top'
                      src={this.props.userdata.avatar}
                      alt={`${userdata.username} avatar`}
                    />
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body'>
                      <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>{`${t(
                          'Profile.username'
                        )}: ${userdata.username}`}</li>
                        <li className='list-group-item'>{`${t(
                          'Profile.email'
                        )}: ${userdata.email}`}</li>
                        <li className='list-group-item'>{`${t(
                          'Profile.role'
                        )}: ${
                          userdata.role === 'admin'
                            ? t('Profile.admin')
                            : t('Profile.user')
                        }`}</li>
                        <li className='list-group-item'>
                          Maybe password reset btn(?)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='card-body'></div>
              </div>
            </article>
            {achieves !== undefined && (
              <article className='col'>
                {achieves.map(el => (
                  <p key={el.id}>{el.title}</p>
                ))}
              </article>
            )}
          </section>
        )}

        <ActionBtn
          title={t('Profile.create')}
          handler={this.fanficAction.bind(this, 'create', 'new')}
        />
        <ActionBtn
          title={t('Profile.delete')}
          handler={() => deleteFanfic(userdata.id)}
        />
        <FilterableTable
          namespace='Fanfics'
          initialSort='name'
          data={data}
          fields={fields}
          noRecordsMessage='There are no fanfics to display'
          noFilteredRecordsMessage='No fanfics match your filters!'
          pagersVisible={false}
          headerVisible={false}
          iconSort={'▲'}
          iconSortedDesc={'▼'}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  ...state.profilePage,
  auth: state.auth
});

export default withNamespaces('common')(
  connect(mapStateToProps, profileActions)(Profile)
);
