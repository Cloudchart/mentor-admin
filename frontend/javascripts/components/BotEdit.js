import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'

// https://github.com/callemall/material-ui/issues/3151
// import SelectField from 'material-ui/SelectField'


class BotEdit extends Component {

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateBot(this.props.bot.id, this.refs.form)
  }

  // renderers
  //
  renderOptions(item, index) {
    return (
      <option key={ index } value={ item }>{ item }</option>
    )
  }

  renderScenariosOptions(scenario) {
    return(
      <option key={ scenario.id } value={ scenario.id }>{ scenario.type }</option>
    )
  }

  render() {
    const { bot, scenarios, actions } = this.props

    return (
      <div>
        <form ref="form" className="bots-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ bot.name }
            floatingLabelText="Name"
            hintText="Enter name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <TextField
            defaultValue={ bot.token }
            floatingLabelText="Token"
            hintText="Enter token"
            name="token"
            onBlur={ this.handleUpdate.bind(this) }
          />
          <br/>

          <label>
            <span>Scenario</span>
            <select
              name="scenario[id]"
              defaultValue={ bot.scenario.id }
              onChange={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { scenarios.map(this.renderScenariosOptions.bind(this)) }
            </select>
          </label>

          <label>
            <span>Type</span>
            <select
              name="type"
              defaultValue={ bot.type }
              onChange={ this.handleUpdate.bind(this) }
            >
              { ['messenger', 'telegram'].map(this.renderOptions.bind(this)) }
            </select>
          </label>
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
