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

  renderObjectOptions(title, item) {
    return(
      <option key={ item.id } value={ item.id }>{ item[title] }</option>
    )
  }

  render() {
    const { bot, scenarios, bot_owners, actions } = this.props

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
            <span>Type</span>
            <select
              name="type"
              defaultValue={ bot.type }
              onChange={ this.handleUpdate.bind(this) }
            >
              { ['messenger', 'telegram'].map(this.renderOptions.bind(this)) }
            </select>
          </label>

          <label>
            <span>Scenario</span>
            <select
              name="scenario[id]"
              defaultValue={ bot.scenario.id }
              onChange={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { scenarios.map(this.renderObjectOptions.bind(this, 'type')) }
            </select>
          </label>

          <label>
            <span>Bot Owner</span>
            <select
              name="bot_owner[id]"
              defaultValue={ bot.bot_owner.id }
              onChange={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { bot_owners.map(this.renderObjectOptions.bind(this, 'name')) }
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
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotEdit
