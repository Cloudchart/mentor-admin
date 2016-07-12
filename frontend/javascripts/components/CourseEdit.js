import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

// https://github.com/callemall/material-ui/issues/3151
// import SelectField from 'material-ui/SelectField'


class CourseEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.item.name,
      isActive: props.item.isActive,
      botId: props.item.botId,
      scenarioId: props.item.scenarioId,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    const { item, actions } = this.props
    actions.updateCourse(item.id, this.refs.form)
  }

  // renderers
  //
  renderOptionsForSelect(item) {
    return(
      <option key={ item.id } value={ item.id }>{ item.name }</option>
    )
  }

  render() {
    const { item, bots, scenarios, actions } = this.props

    return (
      <div>
        <form ref="form" className="course-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter course name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <Toggle
            label="Is active"
            labelPosition="right"
            name="isActive"
            defaultToggled={ this.state.isActive }
            onBlur={ this.handleUpdate.bind(this) }
          />

          <label>
            <span>Bot</span>
            <select
              name="botId"
              defaultValue={ this.state.botId }
              onBlur={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { sortBy(bots, 'name').map(this.renderOptionsForSelect.bind(this)) }
            </select>
          </label>

          <label>
            <span>Scenario</span>
            <select
              name="scenarioId"
              defaultValue={ this.state.scenarioId }
              onBlur={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { sortBy(scenarios, 'name').map(this.renderOptionsForSelect.bind(this)) }
            </select>
          </label>
        </form>
      </div>
    )
  }

}

CourseEdit.propTypes = {
  item: PropTypes.object.isRequired,
  bots: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CourseEdit
