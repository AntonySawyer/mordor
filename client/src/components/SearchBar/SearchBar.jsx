import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import * as searchActions from '../../redux/actions/searchActions';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import './SearchBar.css';

class SeacrhBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
    this.getByText = this.props.getByText;
    this.handlerSearchString = this.handlerSearchString.bind(this);
    this.prepareTextSearch = this.prepareTextSearch.bind(this);
  }

  handlerSearchString(e) {
    this.setState({ searchString: e.target.value });
  }

  prepareTextSearch() {
    const searchString = this.state.searchString;
    this.getByText(searchString);
    this.props.history.push(`/search/text/${searchString}`);
  }

  render() {
    const { t } = this.props;
    const { searchString } = this.state;

    return (
      <div className='input-group mb-3'>
        <Input
          type='search'
          placeholder={t('NavBar.search')}
          id={'searchString'}
          value={searchString}
          onChange={this.handlerSearchString}
        />
        <div className='input-group-append'>
          <ActionBtn
            title={t('NavBar.search')}
            handler={this.prepareTextSearch}
          />
        </div>
      </div>
    );
  }
}

export default withNamespaces('common')(
  connect(null, searchActions)(withRouter(SeacrhBar))
);
