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
  renderText(item) {
    if (item.type === 'image') return null
    return (
      <TextField
        name="text"
        defaultValue={ item.text }
        multiLine={ true }
        floatingLabelText="Text"
        hintText="Enter text"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  renderUrl(item) {
    if (item.type === 'text') return null
    return (
      <TextField
        name="url"
        defaultValue={ item.url }
        floatingLabelText="URL"
        hintText="Enter url"
        onBlur={ this.handleUpdate.bind(this) }
      />
    )
  }

  render() {
    const { item } = this.props

    return (
      <Paper style={{ padding: '20px', width: '400px', margin: '20px 0' }}>
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

          { this.renderText(item) }
          { this.renderUrl(item) }
        </form>
      </Paper>
    )
  }
}

BlockEdit.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BlockEdit
