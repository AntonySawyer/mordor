import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Container, Draggable } from 'react-smooth-dnd';
import ActionBtn from '../common/ActionBtn/';
import Select from '../common/Select/';
import './ChapterNav.css';

class ChapterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.chapters.map((el, index) => {
        return {
          id: index,
          data: el
        };
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.chapters.map((el, index) => {
        return {
          id: index,
          data: el
        };
      })
    });
  }

  applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    this.props.orderHandler(
      result.map(el => el.data),
      addedIndex
    );
    return result;
  }

  render() {
    const {
      t,
      mode,
      label,
      selectorId,
      chapters,
      changeHandler,
      newChapterHandler,
      defaultSelectValue,
      deleteChapterHandler
    } = this.props;
    return (
      <>
        {mode !== 'read' && (
          <>
            <ActionBtn title={'Add new'} handler={newChapterHandler} />
            <Container
              onDrop={e =>
                this.setState({ items: this.applyDrag(this.state.items, e) })
              }
            >
              {this.state.items.map((p, index) => {
                return (
                  <Draggable key={p.id}>
                    <div className='draggable-item'>{`${index + 1} - ${
                      p.data.title
                    }`}</div>
                  </Draggable>
                );
              })}
            </Container>
            <ActionBtn title={'Delete active'} handler={deleteChapterHandler} />
          </>
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
}

export default withNamespaces('common')(ChapterNav);
