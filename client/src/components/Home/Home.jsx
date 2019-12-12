import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import Badge from '../common/Badge/';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lastUpdate, topRated, tags, t, i18n } = this.props;
    const data = i18n.getDataByLanguage(i18n.language);
    return (
      <section className='Home container'>
        <div className='row'>
          <div className='col'>
            <h3>{t('Home.lastUpdate')}</h3>
            <ul>
              {lastUpdate.map(el => (
                <li key={el.id}>
                  <p>
                    <span>
                      <a href={el.link}>{el.title}</a>
                    </span>
                    <Badge
                      title={el.updateDate}
                      className='badge-secondary badge-light'
                    />
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
                    <span>
                      <a href={el.link}>{el.title}</a>
                    </span>
                    <Badge
                      title={el.stars}
                      className='badge-pill badge-warning'
                    />
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
              <a href={`tag_${tag.id}`} className='badge badge-primary'>
                {tag.title}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => state.homePage;

export default withNamespaces('common')(connect(mapStateToProps)(Home));
