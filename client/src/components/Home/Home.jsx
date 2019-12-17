import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';

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
    console.log(this.props);
    const {
      lastUpdate,
      topRated,
      tags,
      syncParams,
      t,
      lng,
      CONST
    } = this.props;
    return (
      <section className='Home container'>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.categoriesMenu')}</h3>
            {CONST.categories &&
              CONST.categories.map((category, index) => (
                <a
                  key={index}
                  href={`category_${category}`}
                  className='badge badge-primary'
                >
                  {category}
                </a>
              ))}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.lastUpdate')}</h3>
            <ul>
              {lastUpdate.map(el => (
                <li key={el.id}>
                  <p>
                    <Badge
                      title={new Date(el.datestamp).toLocaleDateString(lng)}
                      className='badge-secondary badge-light'
                    />
                    <NavLink to={`/fanfic/read/${el.id}`}>{el.title}</NavLink>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className='col'>
            <h3>{t('Home.topRate')}</h3>
            <ul>
              {topRated.map(el => (
                <li key={el.id}>
                  <p>
                    <Badge
                      title={el.rate}
                      className='badge-pill badge-warning'
                    />
                    <NavLink to={`/fanfic/read/${el.id}`}>{el.title}</NavLink>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.tagCloud')}</h3>
            {tags.map(tag => (
              <a
                key={tag.id}
                href={`tag_${tag.id}`}
                className='badge badge-primary'
              >
                {tag.title}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  ...state.homePage,
  CONST: state.syncParams.CONST
});

export default withNamespaces('common')(
  connect(mapStateToProps, homeActions)(Home)
);
