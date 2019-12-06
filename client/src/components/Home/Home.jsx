import React, { Component } from 'react';
import Badge from '../common/Badge/';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className='Home container'>
        <div className='row'>
          <div className='col'>
            <h3>Last update</h3>
            <ul>
              <li>
                <p>
                  {' '}
                  Some title 1
                  <Badge
                    title='Some date'
                    className='badge-secondary badge-light'
                  />
                </p>
              </li>
              <li>
                <p>
                  Some title 2
                  <Badge
                    title='Some date'
                    className='badge-secondary badge-light'
                  />
                </p>
              </li>
              <li>
                <p>
                  London is a capital of Great Britan
                  <Badge
                    title='Some date'
                    className='badge-secondary badge-light'
                  />
                </p>
              </li>
              <li>
                <p>
                  Looks like another title
                  <Badge
                    title='Some date'
                    className='badge-secondary badge-light'
                  />
                </p>
              </li>
              <li>
                <p>
                  Some title
                  <Badge
                    title='Some date'
                    className='badge-secondary badge-light'
                  />
                </p>
              </li>
            </ul>
          </div>
          <div className='col'>
            <h3>Rate top</h3>
            <ul>
              <li>
                <p>
                  <Badge title='4.8' className='badge-pill badge-warning' />
                  Cat going throw the glass
                </p>
              </li>
              <li>
                <p>
                  <Badge title='4.8' className='badge-pill badge-warning' />
                  London is a capital of Great Britan
                </p>
              </li>
              <li>
                <p>
                  <Badge title='4.8' className='badge-pill badge-warning' />
                  Some title
                </p>
              </li>
              <li>
                <p>
                  <Badge title='4.8' className='badge-pill badge-warning' />
                  Some title
                </p>
              </li>
              <li>
                <p>
                  <Badge title='2.3' className='badge-pill badge-danger' />
                  Some bad title
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3>Tags cloud</h3>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
            <a href='#' className='badge badge-primary'>
              Tag sample
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
