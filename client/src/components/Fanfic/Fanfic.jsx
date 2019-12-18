import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import ReactTags from 'react-tag-autocomplete';
import 'react-mde/lib/styles/css/react-mde-all.css';

import * as fanficActions from '../../redux/actions/fanficActions';
import * as preloadActions from '../../redux/actions/preloadActions';

import Spinner from '../common/Spinner/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import Select from '../common/Select/';

import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '# Chapter 1 \n\n Type text here',
      selectedTab: 'write',
      title: '',
      shortDescr: '',
      category: this.props.categories[0],
      isStillFetching: true,
      tags: [],
      suggestions: []
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
    const title = document.getElementById('fanficTitle').value;
    const shortDescr = this.state.shortDescr;
    const tags = this.state.tags;
    const newTags = tags.filter(el => el.id === undefined);
    if (newTags.length > 0) {
      this.props.saveTags(newTags);
    }
    const category = this.state.category;
    const userId = this.props.userdata.id;
    const chapters = [this.state.markdown]; //utilFunc with return object in future
    const images = 'sample.png';
    this.props.saveFanfic(
      this.props.match.params.id,
      title,
      tags.map(el => el.name),
      category,
      shortDescr,
      userId,
      chapters,
      images
    );
  }

  updateMarkdown(value) {
    this.setState({ markdown: value });
  }

  updateDescr(e) {
    this.setState({shortDescr: e.target.value});
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  updateCategory(e) {
    this.setState({ category: e.target.value });
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    const suggestions = this.state.suggestions.slice(0);
    suggestions.push(tags[i]);
    tags.splice(i, 1);
    this.setState({ tags, suggestions });
  }

  handleAddition(tag) {
    const tags = [...this.state.tags, tag];
    const suggestions = this.state.suggestions.filter(
      el => el.name !== tag.name
    );
    this.setState({ tags, suggestions });
  }

  handleValidate(tag) {
    return this.state.tags.filter(el => el.name === tag.name).length === 0;
  }

  render() {
    const { t, match, categories, title } = this.props;
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
        shortDescr: this.props.shortDescr,
        isStillFetching: false,
        suggestions: this.props.suggestions,
        tags: this.props.tags.map(el => ({ id: 'old', name: el }))
      });
    }

    if (mode === 'create' && this.state.isStillFetching) {
      this.setState({
        isStillFetching: false,
        suggestions: this.props.suggestions
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
                    id='fanficTitle'
                    value={this.state.title}
                    onChange={this.updateTitle.bind(this)}
                  />
                  <Select
                    id='categorySelect'
                    label={t('Fanfic.category')}
                    defaultValue={this.props.category}
                    values={categories.map(el => ({
                      title: el,
                      value: el
                    }))}
                    handler={this.updateCategory.bind(this)}
                  />
                  <textarea id='shortDescr' cols='30' rows='10' value={this.state.shortDescr} onChange={this.updateDescr.bind(this)}></textarea>
                  <ReactTags
                    tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    placeholder={t('Fanfic.addTags')}
                    allowNew={true}
                    handleDelete={this.handleDelete.bind(this)}
                    handleAddition={this.handleAddition.bind(this)}
                    handleValidate={this.handleValidate.bind(this)}
                  />
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
                  {this.props.tags.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </div>
              </section>
              <div>
                <span>Description</span>
                <span>{this.props.shortDescr}</span>
              </div>
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
  categories: state.syncParams.CONST.categories,
  suggestions: state.syncParams.tags
});

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Fanfic)
);
