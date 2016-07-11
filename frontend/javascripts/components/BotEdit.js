import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

// https://github.com/callemall/material-ui/issues/3151
// import SelectField from 'material-ui/SelectField'


class BotEdit extends Component {

  constructor(props) {
    super(props)
    props.bot.keys = props.bot.keys || {}
    this.state = {
      name: props.bot.name,
      isActive: props.bot.isActive,
      scenarioId: props.bot.scenarioId,
      facebookKey: props.bot.keys.facebookKey,
      telegramKey: props.bot.keys.telegramKey,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    const { bot, actions } = this.props
    actions.updateBot(bot.id, this.refs.form)
  }

  // renderers
  //
  renderScenariosOptions(scenario) {
    return(
      <option key={ scenario.id } value={ scenario.id }>{ scenario.name }</option>
    )
  }

  render() {
    const { bot, scenarios, actions } = this.props

    return (
      <div>
        <form ref="form" className="bots-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter bot name"
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

          <TextField
            defaultValue={ this.state.facebookKey }
            floatingLabelText="Facebook key"
            hintText="Enter facebook key"
            name="keys[facebookKey]"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            defaultValue={ this.state.telegramKey }
            floatingLabelText="Telegram key"
            hintText="Enter telegram key"
            name="keys[telegramKey]"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <select
            name="scenarioId"
            defaultValue={ this.state.scenarioId }
            onBlur={ this.handleUpdate.bind(this) }
          >
            <option></option>
            { sortBy(scenarios, 'name').map(this.renderScenariosOptions.bind(this)) }
          </select>
        </form>
      </div>
    )
  }

}

BotEdit.propTypes = {
  bot: PropTypes.object.isRequired,
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotEdit
