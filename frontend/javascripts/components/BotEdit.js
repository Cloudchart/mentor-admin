import React, { Component, PropTypes } from 'react'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'


class BotEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.bot.name,
      isActive: props.bot.isActive,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleInputChange(attr, event) {
    const value = attr === 'isActive' ? event.target.checked : event.target.value
    this.setState({ [attr]: value })
  }

  handleUpdate(event) {
    const { bot, actions } = this.props
    actions.updateBot(bot.id, this.refs.form)
  }

  // renderers
  //
  render() {
    const { bot, questions, actions } = this.props

    return (
      <div>
        <form ref="form" className="bots-edit" onSubmit={ this.handleSubmit }>
          <TextField
            value={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter bot name"
            name="name"
            onChange={ this.handleInputChange.bind(this, 'name') }
            onBlur={ this.handleUpdate.bind(this) }
          />

          <Toggle
            label="Is active"
            labelPosition="right"
            name="isActive"
            toggled={ this.state.isActive }
            onToggle={ this.handleInputChange.bind(this, 'isActive') }
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>
      </div>
    )
  }

}

BotEdit.propTypes = {
  bot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotEdit
