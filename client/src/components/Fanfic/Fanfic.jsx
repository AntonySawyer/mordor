import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import * as fanficActions from '../../redux/actions/fanficActions';

import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode
    };
  }

  render() {
    const { readFanfic, saveFanfic, mode, t, match } = this.props;
    return (
      <section className='profile container'>
        <h1>fanfic here</h1>
      </section>
    );
  }
}

const mapStateToProps = state => state.profilePage;

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Fanfic)
);
