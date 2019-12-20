import React from 'react';
import { withNamespaces } from 'react-i18next';
import ActionBtn from '../common/ActionBtn/';
import Select from '../common/Select/';
import './ChapterNav.css';

function ChapterNav({
  t,
  mode,
  label,
  selectorId,
  chapters,
  changeHandler,
  newChapterHandler,
  defaultSelectValue
}) {
  return (
    <>
      {mode !== 'read' && (
        <ActionBtn title={'Add new'} handler={newChapterHandler} />
      )}
      <Select
        id='chaptersSelect'
        label={t('Fanfic.chapters')}
        defaultValue={defaultSelectValue}
        values={chapters.map((el, index) => ({
          title: el.title,
          value: index
        }))}
        handler={changeHandler}
      />
    </>
  );
}

export default withNamespaces('common')(ChapterNav);
