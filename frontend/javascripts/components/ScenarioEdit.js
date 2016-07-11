import React, { Component, PropTypes } from 'react'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'


class ScenarioEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.scenario.name,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleInputChange(attr, event) {
    this.setState({ [attr]: event.target.value })
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
            value={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter scenario name"
            name="name"
            onChange={ this.handleInputChange.bind(this, 'name') }
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
