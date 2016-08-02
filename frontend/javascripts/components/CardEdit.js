import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

import ContentClearIcon from 'material-ui/svg-icons/content/clear'

import BlocksList from './BlocksList'
import SortablePaperActions from './SortablePaperActions'
import Tags from './Tags'


class CardEdit extends Component {

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

  handleSortChange(items) {
    this.props.actions.updateCourse(this.props.course.id, { insights: items })
  }

  // renderers
  //
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

  render() {
    const { item, course, tags, actions } = this.props

    return (
      <Paper style={{ width: '600px', margin: '20px 0', padding: '20px' }}>
        { this.renderDeleteButton() }
        <SortablePaperActions
          selectedItemId={ item.id }
          items={ course.insights }
          onChange={ this.handleSortChange.bind(this) }
        />

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

          <Tags
            selectedTags={ item.tags }
            tags={ tags }
            onChange={ this.handleUpdate.bind(this) }
          />

          <TextField
            name="origin[title]"
            defaultValue={ item.origin.title }
            floatingLabelText="Origin title"
            hintText="Enter origin title"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="origin[url]"
            defaultValue={ item.origin.url }
            floatingLabelText="Origin url"
            hintText="Enter origin url"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="origin[duration]"
            defaultValue={ item.origin.duration }
            type="number"
            floatingLabelText="Origin duration"
            hintText="Enter origin duration"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>

        <h3>Blocks</h3>
        <BlocksList
          cardId={ item.id }
          items={ item.blocks }
          actions={ actions }
        />
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
