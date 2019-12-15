import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '@uiw/react-markdown-editor';

import * as fanficActions from '../../redux/actions/fanficActions';

import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
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

  tempCreateNew() {
    const title = document.getElementById('newFanficTitle').value;
    const tags = 'tag 1, tag 2';
    const category = 'parody';
    const userId = this.props.userId;
    const chapters = this.state.markdown; //utilFunc with return object in future
    const images = 'sample.png';
    this.props.saveFanfic(title, tags, category, userId, chapters, images);
  }

  updateMarkdown(editor, data, value) {
    this.setState({ markdown: value });
  }

  render() {
    const { readFanfic, saveFanfic, mode, t, match } = this.props;
    return (
      <section className='profile container'>
        <section>
          {mode !== 'read' && (
            <ActionBtn title='Save' handler={this.tempCreateNew.bind(this)} />
          )}
          {mode === 'read' ? (
            <div>
              <h1>Title here</h1>
              <span>category</span>
              <span>some tags</span>
            </div>
          ) : (
            <div>
              <Input placeholder='title' id='newFanficTitle' />
              <Input placeholder='category' />
              <Input placeholder='tags' />
            </div>
          )}
        </section>
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
