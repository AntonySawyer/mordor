import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import dateFormat from '../../utils/dateFormat';
import * as homeActions from '../../redux/actions/homeActions';
import Badge from '../common/Badge/';
import Spinner from '../common/Spinner/';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLastUpdated = this.props.getLastUpdated;
    this.getRated = this.props.getRated;
  }

  componentDidMount() {
    this.getLastUpdated();
    this.getRated();
  }

  fanficAction(id) {
    this.props.history.push(`/fanfic/read/${id}`);
  }

  render() {
    const { lastUpdate, topRated, tags, t, lng, CONST } = this.props;
    return (
      <section className='Home container'>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.categoriesMenu')}</h3>
            {CONST.categories &&
              CONST.categories.map((category, index) => (
                <NavLink
                  key={index}
                  to={`/search/category/${category}`}
                  className='badge badge-success'
                >
                  {category}
                </NavLink>
              ))}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.lastUpdate')}</h3>
            <div className='list-group'>
              {lastUpdate.map(el => (
                <NavLink
                  key={el.id}
                  to={`/fanfic/read/${el.id}`}
                  className='list-group-item list-group-item-action flex-column align-items-start'
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{el.title}</h5>
                    <small>
                      <Badge
                        title={dateFormat(el.datestamp, lng)}
                        className='badge-secondary badge-light'
                      />
                    </small>
                  </div>
                  <p className='mb-1'>{el.shortDescr}</p>
                </NavLink>
              ))}
            </div>
          </div>
          <div className='col'>
            <h3>{t('Home.topRate')}</h3>
            <div className='list-group'>
              {topRated.map(el => (
                <NavLink
                  key={el.id}
                  to={`/fanfic/read/${el.id}`}
                  className='list-group-item list-group-item-action flex-column align-items-start'
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{el.title}</h5>
                    <small>
                      <Badge
                        title={el.rate}
                        className='badge-pill badge-warning'
                      />
                    </small>
                  </div>
                  <p className='mb-1'>{el.shortDescr}</p>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.tagCloud')}</h3>
            {tags === undefined ? (
              <Spinner />
            ) : (
              tags.map(tag => (
                <NavLink
                  key={tag.id}
                  to={`/search/tag/${tag.name}`}
                  className='badge badge-primary'
                >
                  {tag.name}
                </NavLink>
              ))
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  ...state.homePage,
  CONST: state.syncParams.CONST,
  tags: state.syncParams.tags
});

export default withNamespaces('common')(
  connect(mapStateToProps, homeActions)(Home)
);
