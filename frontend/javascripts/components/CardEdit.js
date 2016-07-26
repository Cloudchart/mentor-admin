import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'

// https://github.com/callemall/material-ui/issues/2615
import AutoComplete from 'material-ui/AutoComplete'

import ContentClearIcon from 'material-ui/svg-icons/content/clear'
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import BlocksList from './BlocksList'


class CardEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tagSearchText: '',
      selectedTags: props.item.tags,
    }
  }

  // helpers
  //
  getSelectedIndex() {
    return this.props.course.insights.findIndex(i => i.id === this.props.item.id)
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateCard(this.props.item.id, this.refs.form)
  }

  handleDelete(event) {
    if (window.confirm('Are you sure?')) {
      const { item, course, actions } = this.props
      const insights = course.insights.filter(insight => insight.id !== item.id)
      actions.updateCourse(course.id, { insights: insights })
    }
  }

  handleTagsInputUpdate(value) {
    this.setState({ tagSearchText: value })
  }

  handleTagsInputSelect(value) {
    const selectedTags = [ ...new Set(this.state.selectedTags.concat(value)) ]
    this.setState({ tagSearchText: '', selectedTags: selectedTags })
    setTimeout(() => { this.handleUpdate() }, 200)
  }

  handleTagDelete(value) {
    const selectedTags = this.state.selectedTags.filter(tag => tag !== value)
    this.setState({ selectedTags: selectedTags })
    setTimeout(() => { this.handleUpdate() }, 200)
  }

  handleMove(direction, event) {
    const { item, course, actions } = this.props

    let insights = course.insights
    const selectedIndex = this.getSelectedIndex()
    const indexToBeReplaced = selectedIndex + direction

    insights = insights.map((insight, index) => {
      if (index === selectedIndex) {
        return insights[indexToBeReplaced]
      } else if (index === indexToBeReplaced) {
        return insights[selectedIndex]
      } else {
        return insight
      }
    })

    actions.updateCourse(course.id, { insights: insights })
  }

  // renderers
  //
  renderMoveUpButton() {
    if (this.getSelectedIndex() === this.props.course.insights.length - 1) return null

    return (
      <IconButton
        style={{ float: 'right' }}
        onTouchTap={ this.handleMove.bind(this, 1) }
      >
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  renderMoveDownButton() {
    if (this.getSelectedIndex() === 0) return null

    return (
      <IconButton
        style={{ float: 'right' }}
        onTouchTap={ this.handleMove.bind(this, -1) }
      >
        <ExpandLessIcon />
      </IconButton>
    )
  }

  renderDeleteButton() {
    return (
      <IconButton
        iconStyle={{ width: '20px', height: '20px' }}
        style={{ float: 'right' }}
        onTouchTap={ this.handleDelete.bind(this) }
      >
        <ContentClearIcon />
      </IconButton>
    )
  }

  renderTag(tag, index) {
    return (
      <Chip key={ index } style={{ margin: 4 }} onRequestDelete={ this.handleTagDelete.bind(this, tag) }>
        <span>{ tag }</span>
        <input type="hidden" name="tags[]" value={ tag }/>
      </Chip>
    )
  }

  renderTags() {
    return (
      <div className="tags" style={{ display: 'flex', flexWrap: 'wrap' }}>
        { this.state.selectedTags.map(this.renderTag.bind(this)) }
      </div>
    )
  }

  render() {
    const { item, tags, actions } = this.props

    return (
      <Paper style={{ width: '600px', margin: '20px 0', padding: '20px' }}>
        { this.renderDeleteButton() }
        { this.renderMoveUpButton() }
        { this.renderMoveDownButton() }

        <form ref="form" style={{ marginBottom: '40px' }} onSubmit={ this.handleSubmit }>
          <TextField
            name="content"
            defaultValue={ item.content }
            multiLine={ true }
            floatingLabelText="Content"
            hintText="Enter card content"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="author"
            defaultValue={ item.author }
            floatingLabelText="Author"
            hintText="Enter card author"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <AutoComplete
            floatingLabelText="Tags"
            hintText="Type anything"
            dataSource={ this.props.tags }
            searchText={ this.state.tagSearchText }
            onNewRequest={ this.handleTagsInputSelect.bind(this) }
            onUpdateInput={ this.handleTagsInputUpdate.bind(this) }
          />
          { this.renderTags() }
        </form>
      </Paper>
    )
  }

}

CardEdit.propTypes = {
  item: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardEdit
