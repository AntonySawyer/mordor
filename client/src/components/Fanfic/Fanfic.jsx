import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import ReactTags from 'react-tag-autocomplete';
import StarRatings from 'react-star-ratings';
import 'react-mde/lib/styles/css/react-mde-all.css';

import * as fanficActions from '../../redux/actions/fanficActions';

import Spinner from '../common/Spinner/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import Select from '../common/Select/';
import LikeBtn from '../LikeBtn';
import ChapterNav from '../ChapterNav/';

import './Fanfic.css';

class Fanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      selectedTab: 'write',
      rating: 0,
      fanficTitle: '',
      shortDescr: '',
      category: [],
      isStillFetching: true,
      tags: [],
      suggestions: [],
      liked: false,
      activeChapter: 0,
      chapters: [{ title: 'Unnamed', content: 'Add text here' }],
      chapterTitle: '',
      stars: [1, 2, 4, 8, 3],
      userStars: 0
    };
    this.updateMarkdown = this.updateMarkdown.bind(this);
  }

  componentDidMount() {
    document.title = `Fanfic - ${this.props.match.params.mode}`;
  }

  rateCount() {
    const votes = this.state.stars.reduce((a, b) => a + b, 0);
    const sum = this.state.stars
      .map((el, i) => el * (i + 1))
      .reduce((a, b) => a + b, 0);
    const calcRate = sum / votes;
    this.setState({ rating: calcRate });
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
    console.log(chapters);
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

  changeRating(rating) {
    const newStars = this.state.stars.slice(0);
    if (this.state.userStars !== 0) {
      newStars[this.state.userStars - 1] -= 1;
    }
    newStars[rating - 1] += 1;
    this.rateCount();
    this.setState({ userStars: rating, stars: newStars }); //don't forget update in User.model
  }

  handleLike() {
    this.setState((PrevState, props) => {
      const newChapters = PrevState.chapters.slice(0);
      const prevLikesCount = +newChapters[PrevState.activeChapter]['likes'];
      PrevState.liked
        ? (newChapters[PrevState.activeChapter]['likes'] = prevLikesCount - 1)
        : (newChapters[PrevState.activeChapter]['likes'] = prevLikesCount + 1);
      return { liked: !PrevState.liked, chapters: newChapters };
    });
  }

  changeActiveChapter(e) {
    this.setState({
      activeChapter: +e.target.value,
      chapterTitle: this.state.chapters[+e.target.value]['title'],
      markdown: this.state.chapters[+e.target.value]['content'],
      liked: false //fix me
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

  applyNewOrder(sortedChapters, addedIndex) {
    this.setState({ chapters: sortedChapters, activeChapter: addedIndex });
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
        markdown: this.props.chapters[0].content,
        fanficTitle: this.props.title,
        categories: this.props.categories[0],
        category: this.props.category,
        chapters: this.props.chapters,
        shortDescr: this.props.shortDescr,
        isStillFetching: false,
        suggestions: this.props.suggestions,
        tags: this.props.tags.map(el => ({ id: 'old', name: el })),
        chapterTitle: this.props.chapters[0]['title']
      });
    }

    if (!needToFetch && mode === 'read' && this.state.isStillFetching) {
      this.setState({
        fanficTitle: this.props.title,
        category: this.props.category,
        chapters: this.props.chapters,
        shortDescr: this.props.shortDescr,
        isStillFetching: false,
        chapterTitle: this.props.chapters[this.state.activeChapter]['title']
      });
      this.rateCount();
    }

    if (mode === 'create' && this.state.isStillFetching) {
      this.setState({
        isStillFetching: false,
        suggestions: this.props.suggestions,
        categories: this.props.categories[0],
        chapterTitle: '',
        chapters: [{ title: 'Unnamed', content: 'Add text here' }]
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
              {((this.state.chapters !== undefined &&
                this.state.chapters.length > 1) ||
                mode === 'create') && (
                <ChapterNav
                  mode={mode}
                  label={t('Fanfic.chapters')}
                  selectorId='chaptersSelect'
                  chapters={this.state.chapters}
                  orderHandler={this.applyNewOrder.bind(this)}
                  changeHandler={this.changeActiveChapter.bind(this)}
                  newChapterHandler={this.addNewChapter.bind(this)}
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
                  <h1>{this.props.fanficTitle}</h1>
                  <span>{this.props.category}</span>
                  {this.props.tags.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </div>
              </section>
              <span>Average rate: {this.state.rating}</span>
              <StarRatings
                rating={this.state.userStars}
                starRatedColor='blue'
                changeRating={this.changeRating.bind(this)}
                numberOfStars={5}
                name='rating'
              />
              <div>
                <span>Description:</span>
                <span>{this.props.shortDescr}</span>
              </div>
              <ChapterNav
                mode={mode}
                label={t('Fanfic.chapters')}
                selectorId='chaptersSelect'
                chapters={this.props.chapters}
                changeHandler={this.changeActiveChapter.bind(this)}
              />
              <ReactMarkdown
                source={
                  this.props.chapters[this.state.activeChapter]['content']
                }
              />
              <LikeBtn
                countLikes={
                  this.state.chapters[this.state.activeChapter]['likes']
                }
                liked={this.state.liked}
                handler={this.handleLike.bind(this)}
              />
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
