import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as fanficActions from '../../redux/actions/fanficActions';
import dateFormat from '../../utils/dateFormat';
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
      <div className='detailBox'>
        <div className='titleBox'>
          <label>Comment Box</label>
        </div>
        <div className='actionBox'>
          <form className='form-inline' role='form'>
            <div className='form-group'>
              <Input value={this.state.message} onChange={this.handleComment} />
            </div>
            <div className='form-group'>
              <ActionBtn title={'Add'} handler={this.prepareCommentToSend} />
            </div>
          </form>
          <ul className='commentList'>
            {comments.map(el => (
              <li key={el._id}>
                <div className='commenterImage'>
                  <img src={el.avatar} />
                  <span>{el.username}</span>
                </div>
                <div className='commentText'>
                  <span className='date sub-text'>
                    {dateFormat(el.datestamp, this.props.lng)}
                  </span>
                  <p>{el.message}</p>
                </div>
              </li>
            ))}
          </ul>
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
