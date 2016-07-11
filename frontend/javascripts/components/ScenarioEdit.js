import React, { Component, PropTypes } from 'react'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'


class ScenarioEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.scenario.name,
      actionsJSON: props.scenario.actionsJSON,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    const { scenario, actions } = this.props
    actions.updateScenario(scenario.id, this.refs.form)
  }

  // renderers
  //
  render() {
    const { scenario, actions } = this.props

    return (
      <div>
        <form ref="form" className="scenarios-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter scenario name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            defaultValue={ this.state.actionsJSON }
            fullWidth={ true }
            multiLine={ true }
            floatingLabelText="Actions"
            hintText="Enter scenario actions"
            name="actionsJSON"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>
      </div>
    )
  }

}

ScenarioEdit.propTypes = {
  scenario: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default ScenarioEdit
