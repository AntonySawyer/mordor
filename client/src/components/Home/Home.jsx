import React, { Component } from 'react';
import { connect } from 'react-redux';

import Badge from '../common/Badge/';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lastUpdate, topRated, tags } = this.props;
    return (
      <section className='Home container'>
        <div className='row'>
          <div className='col'>
            <h3>Last update</h3>
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
            <h3>Rate top</h3>
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
            <h3>Tags cloud</h3>
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

export default connect(mapStateToProps)(Home);
