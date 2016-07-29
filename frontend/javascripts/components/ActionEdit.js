import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

import ContentClearIcon from 'material-ui/svg-icons/content/clear'

import SortablePaperActions from './SortablePaperActions'


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
      const { item, scenario, actions } = this.props
      const scenarioActions = scenario.actions.filter(action => action.id !== item.id)
      actions.updateScenario(scenario.id, { actions: scenarioActions })
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
          <br/>

          <label>
            <span>Action</span>
            <select
              name="action"
              defaultValue={ item.action }
              onChange={ this.handleUpdate.bind(this) }
            >
              { ['input', 'message', 'sleep', 'course'].map(this.renderOptions.bind(this)) }
            </select>
          </label>
          <br/>

          <TextField
            name="text"
            defaultValue={ item.text }
            multiLine={ true }
            floatingLabelText="Content"
            hintText="Enter action text"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="next"
            defaultValue={ item.next }
            floatingLabelText="Next"
            hintText="Enter next label"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="timeout"
            type="number"
            defaultValue={ item.timeout }
            floatingLabelText="Timeout"
            hintText="Enter timeout"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            name="branch[yes]"
            defaultValue={ item.branch.yes }
            floatingLabelText="Branch yes"
            hintText="Enter branch yes label"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            name="branch[no]"
            defaultValue={ item.branch.no }
            floatingLabelText="Branch no"
            hintText="Enter branch no label"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>
      </Paper>
    )
  }

}

ActionEdit.propTypes = {
  item: PropTypes.object.isRequired,
  scenario: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default ActionEdit
