import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'


class BotOwnerEdit extends Component {

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateBotOwner(this.props.item.id, this.refs.form)
  }

  // renderers
  //
  render() {
    const { item, actions } = this.props

    return (
      <div>
        <form ref="form" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ item.id }
            floatingLabelText="ID"
            disabled={ true }
          />
          <br/>

          <TextField
            defaultValue={ item.name }
            autoFocus={ !item.name }
            floatingLabelText="Name"
            hintText="Enter name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>
      </div>
    )
  }

}

BotOwnerEdit.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotOwnerEdit
