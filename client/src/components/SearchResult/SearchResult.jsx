import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import * as searchActions from '../../redux/actions/searchActions';
import Spinner from '../common/Spinner/';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getByTag = this.props.getByTag;
    this.getByCategory = this.props.getByCategory;
    this.getByText = this.props.getByText;
  }

  componentDidMount() {
    const { mode, param } = this.props.match.params;
    mode === 'tag' && this.getByTag(param);
    mode === 'category' && this.getByCategory(param);
    mode === 'text' && this.getByText(param);
  }

  render() {
    const { t, result, match } = this.props;
    const { mode, param } = match.params;
    const resultIsReady = result[0] !== undefined;
    const notFound = resultIsReady && result[0] === 'empty';
    return (
      <section className='container'>
        {!resultIsReady && <Spinner />}
        {notFound && <p>{t('SearchPage.notFound')}</p>}
        {resultIsReady && !notFound && (
          <div className='col'>
            <h3>{`${t('SearchPage.resultsFor')} ${t(`SearchPage.${mode}`)}: '${param}' (${
              result.length
            } ${t('SearchPage.items')})`}</h3>
            <div className='list-group'>
              {this.props.result.map(el => (
                <NavLink
                  key={el.id}
                  to={`/fanfic/read/${el.id}`}
                  class='list-group-item list-group-item-action flex-column align-items-start'
                >
                  <div class='d-flex w-100 justify-content-between'>
                    <h5 class='mb-1'>{el.title}</h5>
                  </div>
                  <p class='mb-1'>{el.shortDescr}</p>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({ result: state.search });

export default withNamespaces('common')(
  connect(mapStateToProps, searchActions)(SearchResult)
);
