import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '@uiw/react-markdown-editor';

import * as fanficActions from '../../redux/actions/fanficActions';

import ActionBtn from '../common/ActionBtn/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      markdown: '# This is a header\n\nAnd this is a paragraph'
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  updateMarkdown(editor, data, value) {
    this.setState({ markdown: value });
  }

  render() {
    console.log(this.state.markdown);
    const text = this.state.markdown;
    console.log(text);
    const { readFanfic, saveFanfic, mode, t, match } = this.props;
    return (
      <section className='profile container'>
        <h1>fanfic here</h1>
        {mode === 'read' ? (
          <ReactMarkdown source={this.state.markdown} />
        ) : null}
        {mode === 'create' ? (
          <MarkdownEditor
            height='500'
            value={'# Type here'}
            onChange={() => this.updateMarkdown}
          />
        ) : null}
        {mode === 'edit' ? (
          <MarkdownEditor
            height='500'
            value={this.state.markdown}
            onChange={() => this.updateMarkdown}
          />
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = state => state.profilePage;

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Fanfic)
);
