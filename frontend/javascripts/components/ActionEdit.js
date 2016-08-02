import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

import ContentClearIcon from 'material-ui/svg-icons/content/clear'

import SortablePaperActions from './SortablePaperActions'
import Tags from './Tags'

const actionsValues = ['input', 'message', 'sleep', 'course', 'cardlist', 'coursechooser']


class ActionEdit extends Component {

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateAction(this.props.item.id, this.refs.form)
  }

  handleDelete(event) {
    if (window.confirm('Are you sure?')) {
      this.props.actions.deleteAction(this.props.item.id, this.props.scenario.id)
    }
  }

  handleSortChange(items) {
    this.props.actions.updateScenario(this.props.scenario.id, { actions: items })
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

  renderOptions(item, index) {
    return (
      <option key={ index } value={ item }>{ item }</option>
    )
  }

  renderCoursesOptions(item) {
    return (
      <option key={ item.id } value={ item.id }>{ item.name }</option>
    )
  }

  renderCourse(item) {
    if (item.action === 'course') return (
      <label>
        <span>Course</span>
        <select
          name="course"
          defaultValue={ item.course }
          onChange={ this.handleUpdate.bind(this) }
        >
          <option></option>
          { this.props.courses.map(this.renderCoursesOptions.bind(this)) }
        </select>
      </label>
    )
  }

  renderText(item) {
    if (item.action === 'message') return (
      <TextField
        name="text"
        defaultValue={ item.text }
        multiLine={ true }
        floatingLabelText="Text"
        hintText="Enter action text"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  renderTimeout(item) {
    if (item.action === 'sleep') return (
      <TextField
        name="timeout"
        type="number"
        defaultValue={ item.timeout }
        floatingLabelText="Timeout"
        hintText="Enter timeout"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  renderBranch(item) {
    if (item.action === 'input' || item.action === 'course') return (
      <TextField
        name="branch"
        defaultValue={ item.branch }
        floatingLabelText="Branch"
        hintText="Enter branch"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  renderKeyboard(item) {
    if (item.action === 'message') return (
      <TextField
        name="keyboard"
        defaultValue={ item.keyboard }
        floatingLabelText="Keyboard"
        hintText="Enter keyboard"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  renderTags(item) {
    if (item.action.match(/cardlist|coursechooser/)) return (
      <Tags
        selectedTags={ item.tags }
        tags={ this.props.tags }
        onChange={ this.handleUpdate.bind(this) }
      />
    )
  }

  render() {
    const { item, scenario, tags, actions } = this.props

    return (
      <Paper style={{ width: '600px', margin: '20px 0', padding: '20px' }}>
        { this.renderDeleteButton() }
        <SortablePaperActions
          selectedItemId={ item.id }
          items={ scenario.actions }
          onChange={ this.handleSortChange.bind(this) }
        />

        <form ref="form" style={{ marginBottom: '40px' }} onSubmit={ this.handleSubmit }>
          <TextField
            name="label"
            defaultValue={ item.label }
            floatingLabelText="Label"
            hintText="Enter action label"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            name="next"
            defaultValue={ item.next }
            floatingLabelText="Next"
            hintText="Enter next label"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <label>
            <span>Action</span>
            <select
              name="action"
              defaultValue={ item.action }
              onChange={ this.handleUpdate.bind(this) }
            >
              { actionsValues.map(this.renderOptions.bind(this)) }
            </select>
          </label>

          { this.renderCourse(item) }
          <br/>
          { this.renderText(item) }
          <br/>
          { this.renderTimeout(item) }
          <br/>
          { this.renderBranch(item) }
          <br/>
          { this.renderKeyboard(item) }
          <br/>
          { this.renderTags(item) }
        </form>
      </Paper>
    )
  }

}

ActionEdit.propTypes = {
  item: PropTypes.object.isRequired,
  scenario: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default ActionEdit
