import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '@uiw/react-markdown-editor';

import * as fanficActions from '../../redux/actions/fanficActions';

import Spinner from '../common/Spinner/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      showSpinner: true
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  componentDidMount() {
    if (this.props.title === undefined) {
      this.loadData();
    } else {
      this.setState({ showSpinner: false, isFetching: false });
    }
  }

  loadData() {
    const targetId = this.props.match.params.id;
    if (!this.isFetching) {
      this.props.readFanfic(targetId);
      this.setState({ isFetching: true });
    } else if (this.props.title !== undefined) {
      this.setState({ showSpinner: false });
    }
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
    const { readFanfic, saveFanfic, t, match, title } = this.props;
    const { id, mode } = match.params;
    if (this.props._id !== id) {
      this.props.readFanfic(id);
    }
    return (
      <div>
        {title === undefined ? (
          this.state.showSpinner && <Spinner />
        ) : (
          <section className='profile container'>
            <section>
              {mode !== 'read' && (
                <ActionBtn
                  title='Save'
                  handler={this.tempCreateNew.bind(this)}
                />
              )}
              {mode === 'read' ? (
                <div>
                  <h1>{this.props.title}</h1>
                  <span>category</span>
                  <span>{this.props.tags}</span>
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
              <ReactMarkdown source={this.props.chapters[0]} />
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
                value={this.props.chapters[0]}
                onChange={() => this.updateMarkdown}
              />
            ) : null}
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state.fanfic;

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Fanfic)
);
