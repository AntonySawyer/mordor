import React from 'react';
import { withNamespaces } from 'react-i18next';
import ActionBtn from '../common/ActionBtn/';
import './LikeBtn.css';

function LikeBtn({ t, liked, countLikes, handler }) {
  const state = liked ? 'unlike' : 'like';
  return (
    <div className='likeBtnWrapper'>
      <span>Total likes: {countLikes}</span>
      <ActionBtn
        className={`btn ${liked ? 'btn-info' : 'btn-outline-info'}`}
        title={t(`LikeBtn.${state}`)}
        handler={handler}
      />
    </div>
  );
}

export default withNamespaces('common')(LikeBtn);
