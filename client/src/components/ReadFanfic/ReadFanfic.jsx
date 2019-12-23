import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import StarRatings from 'react-star-ratings';

import * as fanficActions from '../../redux/actions/fanficActions';
import { getProfile } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner/';
import Badge from '../common/Badge/';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import Select from '../common/Select/';
import LikeBtn from '../LikeBtn';
import ChapterNav from '../ChapterNav/';
import Comments from '../Comments/';
import './ReadFanfic.css';

class ReadFanfic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      selectedTab: 'write',
      rating: 0,
      shortDescr: '',
      category: '',
      isStillFetching: true,
      tags: [],
      suggestions: [],
      liked: false,
      activeChapter: 0,
      chapters: [],
      chapterTitle: '',
      userStars: 0,
      rate: 'Unknown'
    };
    this.getProfile = this.props.actions.getProfile;
    this.readFanfic = this.props.actions.readFanfic;
    this.sendLike = this.props.actions.sendLike;
    this.sendStars = this.props.actions.sendStars;
  }

  componentDidMount() {
    document.title = `Fanfic reading`;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rating: nextProps.fanfic.rate });
  }

  redirectToEdit() {
    this.props.history.push(`/fanfic/edit/${this.props.fanfic._id}`);
  }

  changeRating(rating) {
    const fanficId = this.props.match.params.id;
    const userStarForCurrentFanfic = this.props.auth.user.stars.filter(
      el => el.fanficId == fanficId
    );
    const oldRating =
      userStarForCurrentFanfic.length === 1
        ? userStarForCurrentFanfic[0].value
        : null;
    this.sendStars(fanficId, oldRating, rating, this.props.auth.user.id);
    this.setState({ userStars: rating });
  }

  handleLike() {
    const change = this.state.liked ? -1 : 1;
    this.setState((PrevState, props) => {
      return { liked: !PrevState.liked };
    });

    this.sendLike(
      this.state.chapters[this.state.activeChapter]._id,
      change,
      this.props.auth.user.id
    );
  }

  changeActiveChapter(e) {
    this.setState({
      activeChapter: +e.target.value,
      chapterTitle: this.state.chapters[+e.target.value]['title'],
      markdown: this.state.chapters[+e.target.value]['content'],
      liked: this.props.userdata.likes.includes(
        this.state.chapters[+e.target.value]._id
      )
    });
  }

  render() {
    const { t, match, fanfic, auth, userdata } = this.props;
    const { id } = match.params;
    const needToFetch = fanfic._id !== id || fanfic.title === undefined || userdata === undefined;
    const isAdmin = auth.user.role === 'admin';
    const isOwner = fanfic.userId === auth.user.id;

    if (needToFetch) {
      this.readFanfic(id);
      this.getProfile(this.props.auth.user.id);
    }

    if (!needToFetch && this.state.isStillFetching) {
      this.setState({
        category: fanfic.category,
        chapters: fanfic.chapters,
        shortDescr: fanfic.shortDescr,
        isStillFetching: false,
        chapterTitle: fanfic.chapters[this.state.activeChapter]['title'],
        rating: fanfic.rate
      });
      if (auth.isAuthenticated) {
        const userStarForCurrentFanfic =
          userdata.stars.length > 0
            ? userdata.stars.filter(
                el => el.fanficId == id
              )
            : [];
        const userStars =
          userStarForCurrentFanfic.length == 1
            ? userStarForCurrentFanfic[0].value
            : 0;
        this.setState({
          liked: userdata.likes.includes(
            fanfic.chapters[this.state.activeChapter]._id
          ),
          userStars
        });
      }
    }

    return (
      <section className='container'>
        {needToFetch && <Spinner />}
        {!needToFetch && (
          <>
            {(isOwner || isAdmin) && (
              <ActionBtn
                title={'Go to edit'}
                handler={this.redirectToEdit.bind(this)}
              />
            )}
            <section>
              <div>
                <h1>{fanfic.title}</h1>
                <span>
                  Category:
                  <NavLink to={`/search/category/${fanfic.category}`}>
                    <Badge title={fanfic.category} className='badge-success' />
                  </NavLink>
                </span>
                {fanfic.tags.map((el, index) => (
                  <NavLink key={index} to={`/search/tag/${el}`}>
                    <Badge title={el} className='badge-secondary' />
                  </NavLink>
                ))}
              </div>
            </section>
            <span>Average rate: {this.state.rating}</span>
            {auth.isAuthenticated && (
              <StarRatings
                rating={this.state.userStars}
                starRatedColor='blue'
                changeRating={this.changeRating.bind(this)}
                numberOfStars={5}
                name='rating'
              />
            )}
            <div>
              <span>Description:</span>
              <span>{fanfic.shortDescr}</span>
            </div>
            <ChapterNav
              mode={'read'}
              label={t('Fanfic.chapters')}
              selectorId='chaptersSelect'
              chapters={fanfic.chapters}
              changeHandler={this.changeActiveChapter.bind(this)}
            />
            <ReactMarkdown
              source={fanfic.chapters[this.state.activeChapter]['content']}
            />
            <div className='likesWrapper'>
              <span>{`Total likes: ${
                fanfic.chapters[this.state.activeChapter]['likes']
              }`}</span>
              {auth.isAuthenticated && (
                <LikeBtn
                  liked={this.state.liked}
                  handler={this.handleLike.bind(this)}
                />
              )}
            </div>
            {auth.isAuthenticated && <Comments />}
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  fanfic: state.fanfic,
  userdata: state.profilePage.userdata,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...fanficActions, getProfile }, dispatch)
  };
};

export default withNamespaces('common')(
  connect(mapStateToProps, mapDispatchToProps)(ReadFanfic)
);
