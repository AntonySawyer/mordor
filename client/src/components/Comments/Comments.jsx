import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as fanficActions from '../../redux/actions/fanficActions';
import ActionBtn from '../common/ActionBtn/';
import Input from '../common/Input/';
import './Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.sendComment = this.props.sendComment.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.prepareCommentToSend = this.prepareCommentToSend.bind(this);
  }

  prepareCommentToSend() {
    this.sendComment(
      this.props.fanfic._id,
      this.props.auth.user.username,
      this.props.auth.user.avatar,
      this.state.message
    );
    this.setState({ massage: '' });
  }

  handleComment(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    const comments = this.props.fanfic.comments;
    return (
      <div>
        <div class='detailBox'>
          <div class='titleBox'>
            <label>Comment Box</label>
          </div>
          <div class='actionBox'>
            <ul class='commentList'>
              {comments.map(el => (
                <li key={el._id}>
                  <div class='commenterImage'>
                    <img src={el.avatar} />
                    <span>{el.username}</span>
                  </div>
                  <div class='commentText'>
                    <p>{el.message}</p>
                    <span class='date sub-text'>{el.datestamp}</span>
                  </div>
                </li>
              ))}
            </ul>
            <form class='form-inline' role='form'>
              <div class='form-group'>
                <Input
                  value={this.state.message}
                  onChange={this.handleComment}
                />
              </div>
              <div class='form-group'>
                <ActionBtn title={'Add'} handler={this.prepareCommentToSend} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fanfic: state.fanfic,
  auth: state.auth
});

export default withNamespaces('common')(
  connect(mapStateToProps, fanficActions)(Comments)
);
