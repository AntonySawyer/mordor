import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import ReactTags from 'react-tag-autocomplete';
import StarRatings from 'react-star-ratings';
import 'react-mde/lib/styles/css/react-mde-all.css';

import * as fanficActions from '../../redux/actions/fanficActions';

import ReadFanfic from '../ReadFanfic/';
import Spinner from '../common/Spinner/';
import Badge from '../common/Badge/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import Select from '../common/Select/';
import LikeBtn from '../LikeBtn';
import ChapterNav from '../ChapterNav/';
import Comments from '../Comments/';

import './CreateFanfic.css';

class CreateFanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      selectedTab: 'write',
      fanficTitle: '',
      shortDescr: '',
      category: '',
      tags: [],
      suggestions: [],
      activeChapter: 0,
      chapters: [{ title: 'Unnamed', content: 'Add text here' }],
      chapterTitle: '',
      stars: [0, 0, 0, 0, 0]
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  componentDidMount() {
    document.title = `Fanfic create`;
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
    const chapters = this.state.chapters; //utilFunc with return object in future
    const images = 'sample.png';
    const likes = this.state.likes;
    const stars = this.state.stars;
    this.props.saveFanfic(
      this.props.match.params.id,
      title,
      tags.map(el => el.name),
      category,
      shortDescr,
      userId,
      chapters,
      images,
      stars
    );
    this.props.history.push('/');
  }

  updateMarkdown(value) {
    this.setState(PrevState => {
      const newChapters = PrevState.chapters.slice(0);
      newChapters[PrevState.activeChapter]['content'] = value;
      return { markdown: value, chapters: newChapters };
    });
  }

  updateChapterTitle() {
    this.setState(PrevState => {
      const newChapters = PrevState.chapters.slice(0);
      const newChapteTitle = document.getElementById('chapterTitle').value;
      newChapters[PrevState.activeChapter]['title'] = newChapteTitle;
      return { chapters: newChapters, chapterTitle: newChapteTitle };
    });
  }

  updateDescr(e) {
    this.setState({ shortDescr: e.target.value });
  }

  updateTitle(e) {
    this.setState({ fanficTitle: e.target.value });
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

  changeActiveChapter(e) {
    this.setState({
      activeChapter: +e.target.value,
      chapterTitle: this.state.chapters[+e.target.value]['title'],
      markdown: this.state.chapters[+e.target.value]['content'],
      liked: this.props.auth.user.likes.includes(
        this.state.chapters[+e.target.value]._id
      )
    });
  }

  addNewChapter() {
    this.setState(PrevState => {
      const newChapters = this.state.chapters.slice(0);
      newChapters.push({ title: 'Unnamed', content: 'Add text here' });
      return {
        chapters: newChapters,
        activeChapter: newChapters.length - 1,
        chapterTitle: 'Unnamed',
        markdown: 'Add text here'
      };
    });
  }

  deleteChapter() {
    this.setState(PrevState => {
      return {
        chapters: PrevState.chapters.filter(
          (el, i) => i != PrevState.activeChapter
        ),
        activeChapter:
          PrevState.activeChapter > 0 ? PrevState.activeChapter - 1 : 0
      };
    });
  }

  applyNewOrder(sortedChapters, addedIndex) {
    this.setState({ chapters: sortedChapters, activeChapter: addedIndex });
  }

  render() {
    const { t, match, categories, title } = this.props;
    const { id } = match.params;

    if (this.state.isStillFetching) {
      this.setState({
        isStillFetching: false,
        suggestions: this.props.suggestions,
        chapterTitle: '',
        chapters: [{ title: 'Unnamed', content: 'Add text here' }]
      });
    }

    if (this.state.category === '') {
      this.setState({ category: this.props.categories[0] });
    }

    return (
      <section className='profile container'>
        <section>
          <ActionBtn
            title={t('Fanfic.save')}
            handler={this.tempCreateNew.bind(this)}
          />
          <div>
            <Input
              placeholder={t('Fanfic.title')}
              id='fanficTitle'
              value={this.state.fanficTitle}
              onChange={this.updateTitle.bind(this)}
            />
            <Select
              id='categorySelect'
              label={t('Fanfic.category')}
              defaultValue={this.state.category}
              values={categories.map(el => ({
                title: el,
                value: el
              }))}
              handler={this.updateCategory.bind(this)}
            />
            <textarea
              placeholder='Type short description here'
              id='shortDescr'
              cols='30'
              rows='10'
              value={this.state.shortDescr}
              onChange={this.updateDescr.bind(this)}
            ></textarea>
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
        {this.state.chapters !== undefined && (
          <ChapterNav
            mode={'create'}
            label={t('Fanfic.chapters')}
            selectorId='chaptersSelect'
            chapters={this.state.chapters}
            orderHandler={this.applyNewOrder.bind(this)}
            changeHandler={this.changeActiveChapter.bind(this)}
            newChapterHandler={this.addNewChapter.bind(this)}
            deleteChapterHandler={this.deleteChapter.bind(this)}
            defaultSelectValue={this.state.activeChapter}
          />
        )}
        <Input
          placeholder={t('Fanfic.chapterTitle')}
          id='chapterTitle'
          value={this.state.chapters[this.state.activeChapter].title}
          onChange={this.updateChapterTitle.bind(this)}
        />
        <ReactMde
          value={this.state.chapters[this.state.activeChapter].content}
          onChange={value => this.updateMarkdown(value)}
          l18n={{
            write: t('Fanfic.write'),
            preview: t('Fanfic.preview')
          }}
          selectedTab={this.state.selectedTab}
          onTabChange={this.setSelectedTab.bind(this)}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<ReactMarkdown source={this.state.markdown} />)
          }
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.profilePage.userdata,
  auth: state.auth,
  categories: state.syncParams.CONST.categories,
  suggestions: state.syncParams.tags
});

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(CreateFanfic)
);
