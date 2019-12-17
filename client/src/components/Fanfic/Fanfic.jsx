import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import * as fanficActions from '../../redux/actions/fanficActions';

import Spinner from '../common/Spinner/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import Select from '../common/Select/';

import { checkAll, setIndeterminate } from '../../utils/checkboxWorker';
import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '# Chapter 1 \n\n Type text here',
      selectedTab: 'write',
      title: '',
      category: this.props.categories[0],
      isStillFetching: true
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  componentDidMount() {
    document.title = `Fanfic - ${this.props.match.params.mode}`;
  }

  setSelectedTab() {
    this.setState((prevState, props) => {
      return {
        selectedTab: prevState.selectedTab === 'write' ? 'preview' : 'write'
      };
    });
  }

  tempCreateNew() {
    const title = document.getElementById('newFanficTitle').value;
    const tags = 'tag 1, tag 2';
    const category = this.state.category;
    const userId = this.props.userdata.id;
    const chapters = [this.state.markdown]; //utilFunc with return object in future
    const images = 'sample.png';
    this.props.saveFanfic(
      this.props.match.params.id,
      title,
      tags,
      category,
      userId,
      chapters,
      images
    );
  }

  updateMarkdown(value) {
    this.setState({ markdown: value });
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  updateCategory(e) {
    this.setState({ category: e.target.value });
  }

  render() {
    const { readFanfic, saveFanfic, t, match, title } = this.props;
    const { id, mode } = match.params;
    const needToFetch =
      mode !== 'create' && (this.props._id !== id || title === undefined);

    if (needToFetch) {
      this.props.readFanfic(id);
    }

    if (!needToFetch && mode === 'edit' && this.state.isStillFetching) {
      this.setState({
        markdown: this.props.chapters.join('\n\n'),
        title: this.props.title,
        category: this.props.category,
        isStillFetching: false
      });
    }

    return (
      <>
        {needToFetch && <Spinner />}
        <section className='profile container'>
          {!needToFetch && mode !== 'read' && (
            <>
              <section>
                <ActionBtn
                  title={t('Fanfic.save')}
                  handler={this.tempCreateNew.bind(this)}
                />
                <div>
                  <Input
                    placeholder={t('Fanfic.title')}
                    id='newFanficTitle'
                    value={this.state.title}
                    onChange={this.updateTitle.bind(this)}
                  />
                  <Select
                    id='categorySelect'
                    label={t('Fanfic.category')}
                    defaultValue={this.props.category}
                    values={this.props.categories.map(el => ({
                      title: el,
                      value: el
                    }))}
                    handler={this.updateCategory.bind(this)}
                  />
                  <Input placeholder={t('Fanfic.tags')} />
                </div>
              </section>
              <ReactMde
                value={this.state.markdown}
                onChange={value => this.updateMarkdown(value)}
                l18n={{
                  write: t('Fanfic.write'),
                  preview: t('Fanfic.preview')
                }}
                selectedTab={this.state.selectedTab}
                onTabChange={this.setSelectedTab.bind(this)}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(
                    <ReactMarkdown source={this.state.markdown} />
                  )
                }
              />
            </>
          )}

          {!needToFetch && mode === 'read' && (
            <>
              <section>
                <div>
                  <h1>{this.props.title}</h1>
                  <span>{this.props.category}</span>
                  <span>{this.props.tags}</span>
                </div>
              </section>
              <ReactMarkdown source={this.props.chapters[0]} />
            </>
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.fanfic,
  userdata: state.profilePage.userdata,
  categories: state.syncParams.CONST.categories
});

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Fanfic)
);
