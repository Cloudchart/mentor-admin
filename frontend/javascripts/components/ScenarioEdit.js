import React, { Component, PropTypes } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

import ActionsList from './ActionsList'


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
    const { scenario, scenarioActions, courses, tags, actions } = this.props

    return (
      <div>
        <RaisedButton
          label="Back"
          style={{ marginBottom: '30px' }}
          onTouchTap={ this.props.onChange }
        />

        <h3>{ item.type ? `${item.type} scenario` : 'New scenario' }</h3>

        <form ref="form" style={{ marginBottom: '40px' }} onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ item.type }
            autoFocus={ !item.type }
            floatingLabelText="Type"
            hintText="Enter scenario type"
            name="type"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>

        <h3>Actions</h3>

        <ActionsList
          scenario={ item }
          scenarioActions={ scenarioActions }
          courses={ courses }
          tags={ tags }
          actions={ actions }
        />
      </div>
    )
  }

}

ScenarioEdit.propTypes = {
  scenarioId: PropTypes.string.isRequired,
  scenarios: PropTypes.array.isRequired,
  scenarioActions: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  actions: PropTypes.object.isRequired,
}


export default ScenarioEdit
