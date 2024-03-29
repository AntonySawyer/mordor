import React from 'react';
import { withNamespaces } from 'react-i18next';
import ActionBtn from '../common/ActionBtn/';
import './LikeBtn.css';

function LikeBtn({ t, liked, handler }) {
  const state = liked ? 'unlike' : 'like';
  return (
    <div className='likeBtnWrapper'>
      <ActionBtn
        className={`btn ${liked ? 'btn-info' : 'btn-outline-info'}`}
        title={t(`LikeBtn.${state}`)}
        handler={handler}
      />
    </div>
  );
}

export default withNamespaces('common')(LikeBtn);
