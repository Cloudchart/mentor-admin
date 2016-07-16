import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentClearIcon from 'material-ui/svg-icons/content/clear'


class BlockEdit extends Component {

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateBlock(this.props.item.id, this.refs.form)
  }

  handleDelete(event) {
    this.props.actions.deleteBlock(this.props.item.id)
  }

  // renderers
  //
  render() {
    const { item } = this.props

    return (
      <li style={{ width: '400px', margin: '20px 0' }}>
        <Paper style={{ padding: '20px' }}>
          <IconButton
            iconStyle={{ width: '20px', height: '20px' }}
            style={{ float: 'right' }}
            onTouchTap={ this.handleDelete.bind(this) }
          >
            <ContentClearIcon />
          </IconButton>

          <form ref="form" onSubmit={ this.handleSubmit }>
            <label>
              <span>Type</span>
              <select
                name="type"
                defaultValue={ item.type }
                onBlur={ this.handleUpdate.bind(this) }
              >
                <option value="text">text</option>
                <option value="image">image</option>
                <option value="video">video</option>
              </select>
            </label>

            <TextField
              name="position"
              type="number"
              defaultValue={ item.position }
              floatingLabelText="Position"
              hintText="Enter block position"
              onBlur={ this.handleUpdate.bind(this) }
            />
            <br/>

            <TextField
              name="content"
              defaultValue={ item.content }
              multiLine={ true }
              floatingLabelText="Content"
              hintText="Enter block content"
              onBlur={ this.handleUpdate.bind(this) }
            />
          </form>
        </Paper>
      </li>
    )
  }
}

BlockEdit.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BlockEdit
