import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'

// https://github.com/callemall/material-ui/issues/2615
import AutoComplete from 'material-ui/AutoComplete'

import ContentClearIcon from 'material-ui/svg-icons/content/clear'

import BlocksList from './BlocksList'


class CardEdit extends Component {

  constructor(props) {
    super(props)
    const item = this.getItem(props)
    const selectedTags = item.card.tags ? item.card.tags.map(tag => tag.name) : []

    this.state = {
      item: item,
      tagSearchText: '',
      selectedTags: selectedTags,
    }
  }

  // lifecycle
  //
  componentWillReceiveProps(nextProps) {
    this.setState({ item: this.getItem(nextProps) })
  }

  // helpers
  //
  getItem(props) {
    return props.cards.find(card => card.id === props.cardId)
  }

  getTagNames() {
    return this.props.tags.map(tag => tag.name)
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateCard(this.state.item.id, this.refs.form)
  }

  handleDelete(event) {
    if (window.confirm('Are you sure?')) this.props.actions.deleteCard(this.state.item.id)
  }

  handleTagsInputUpdate(value) {
    this.setState({ tagSearchText: value })
  }

  handleTagsInputSelect(value) {
    const selectedTags = [ ...new Set(this.state.selectedTags.concat(value)) ]
    this.setState({ tagSearchText: '', selectedTags: selectedTags })
    setTimeout(() => { this.handleUpdate() }, 200)
  }

  handleTagDelete(value) {
    const selectedTags = this.state.selectedTags.filter(tag => tag !== value)
    this.setState({ selectedTags: selectedTags })
    setTimeout(() => { this.handleUpdate() }, 200)
  }

  // renderers
  //
  renderTag(tag, index) {
    return (
      <Chip key={ index } style={{ margin: 4 }} onRequestDelete={ this.handleTagDelete.bind(this, tag) }>
        <span>{ tag }</span>
        <input type="hidden" name="card[tags][]" value={ tag }/>
      </Chip>
    )
  }

  renderTags() {
    return (
      <div className="tags" style={{ display: 'flex', flexWrap: 'wrap' }}>
        { this.state.selectedTags.map(this.renderTag.bind(this)) }
      </div>
    )
  }

  render() {
    const { item } = this.state
    const { tags, actions } = this.props

    return (
      <li style={{ width: '600px', margin: '20px 0' }}>
        <Paper style={{ padding: '20px' }}>
          <IconButton
            iconStyle={{ width: '20px', height: '20px' }}
            style={{ float: 'right' }}
            onTouchTap={ this.handleDelete.bind(this) }
          >
            <ContentClearIcon />
          </IconButton>

          <form ref="form" style={{ marginBottom: '40px' }} onSubmit={ this.handleSubmit }>
            <TextField
              name="card[text]"
              defaultValue={ item.card.text }
              multiLine={ true }
              floatingLabelText="Text"
              hintText="Enter card text"
              onBlur={ this.handleUpdate.bind(this) }
            />
            <br/>

            <TextField
              name="position"
              type="number"
              defaultValue={ item.position }
              floatingLabelText="Position"
              hintText="Enter card position"
              onBlur={ this.handleUpdate.bind(this) }
            />
            <br/>

            <TextField
              name="card[author]"
              defaultValue={ item.card.author }
              floatingLabelText="Author"
              hintText="Enter card author"
              onBlur={ this.handleUpdate.bind(this) }
            />

            <TextField
              name="card[originUrl]"
              defaultValue={ item.card.originUrl }
              floatingLabelText="Origin URL"
              hintText="Enter card origin URL"
              onBlur={ this.handleUpdate.bind(this) }
            />

            <AutoComplete
              floatingLabelText="Tags"
              hintText="Type anything"
              dataSource={ this.getTagNames() }
              searchText={ this.state.tagSearchText }
              onNewRequest={ this.handleTagsInputSelect.bind(this) }
              onUpdateInput={ this.handleTagsInputUpdate.bind(this) }
            />
            { this.renderTags() }

          </form>

          <h3>Blocks</h3>

          <BlocksList
            items={ item.card.blocks || [] }
            cardCourseId={ item.id }
            actions={ actions }
          />
        </Paper>
      </li>
    )
  }

}

CardEdit.propTypes = {
  cardId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardEdit
