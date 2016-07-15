import React, { Component, PropTypes } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'


class ScenarioEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item: this.getItem(props),
    }
  }

  // lifecycle
  //
  componentWillMount() {
    document.addEventListener('keydown', this.handleEscape.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ item: this.getItem(nextProps) })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape.bind(this))
  }

  // helpers
  //
  getItem(props) {
    return props.scenarios.find(scenario => scenario.id === props.scenarioId)
  }

  // handlers
  //
  handleEscape(event) {
    if (event.keyCode == 27) this.props.onChange()
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateScenario(this.props.scenarioId, this.refs.form)
  }

  // renderers
  //
  render() {
    const { item } = this.state
    const { scenario, actions } = this.props

    return (
      <div>
        <RaisedButton
          label="Back"
          style={{ marginBottom: '30px' }}
          onTouchTap={ this.props.onChange }
        />

        <h3>{ item.name ? `${item.name} scenario` : 'New scenario' }</h3>

        <form ref="form" className="scenario-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ item.name }
            autoFocus={ !item.name }
            floatingLabelText="Name"
            hintText="Enter scenario name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            defaultValue={ item.actionsJSON }
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
  scenarioId: PropTypes.string.isRequired,
  scenarios: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  actions: PropTypes.object.isRequired,
}


export default ScenarioEdit
