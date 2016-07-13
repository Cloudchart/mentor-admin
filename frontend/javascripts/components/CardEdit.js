import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';


class CardEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.item.card.text,
      author: props.item.card.author,
      originUrl: props.item.card.originUrl,
      position: props.item.position,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateCard(this.props.item.id, this.refs.form)
  }

  handleDelete(event) {
    if (window.confirm('Are you sure?')) this.props.actions.deleteCard(this.props.item.id)
  }

  // renderers
  //
  render() {
    const { item, actions } = this.props

    return (
      <li>
        <Paper style={{ marginBottom: '20px', padding: '20px' }}>
          <form ref="form" onSubmit={ this.handleSubmit }>
            <TextField
              name="card[text]"
              defaultValue={ this.state.text }
              multiLine={ true }
              floatingLabelText="Text"
              hintText="Enter card text"
              onBlur={ this.handleUpdate.bind(this) }
            />
            <br/>

            <TextField
              name="card[author]"
              defaultValue={ this.state.author }
              floatingLabelText="Author"
              hintText="Enter card author"
              onBlur={ this.handleUpdate.bind(this) }
            />

            <TextField
              name="card[originUrl]"
              defaultValue={ this.state.originUrl }
              floatingLabelText="Origin URL"
              hintText="Enter card origin URL"
              onBlur={ this.handleUpdate.bind(this) }
            />

            <TextField
              name="position"
              type="number"
              defaultValue={ this.state.position }
              floatingLabelText="Position"
              hintText="Enter card position"
              onBlur={ this.handleUpdate.bind(this) }
            />

            <IconButton
              iconStyle={{ width: '20px', height: '20px' }}
              onTouchTap={ this.handleDelete.bind(this) }
            >
              <ActionDelete />
            </IconButton>
          </form>
        </Paper>
      </li>
    )
  }

}

CardEdit.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardEdit
