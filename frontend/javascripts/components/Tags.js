import React, { Component, PropTypes } from 'react'

// https://github.com/callemall/material-ui/issues/2615
import AutoComplete from 'material-ui/AutoComplete'

import Chip from 'material-ui/Chip'


class Tags extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tagSearchText: '',
      selectedTags: props.selectedTags,
    }
  }

  // handlers
  //
  handleTagsInputUpdate(value) {
    this.setState({ tagSearchText: value })
  }

  handleTagsInputSelect(value) {
    const selectedTags = [ ...new Set(this.state.selectedTags.concat(value)) ]
    this.setState({ tagSearchText: '', selectedTags: selectedTags })
    setTimeout(() => { this.props.onChange() }, 200)
  }

  handleTagDelete(value) {
    const selectedTags = this.state.selectedTags.filter(tag => tag !== value)
    this.setState({ selectedTags: selectedTags })
    setTimeout(() => { this.props.onChange() }, 200)
  }

  // renderers
  //
  renderTag(tag, index) {
    return (
      <Chip key={ index } style={{ margin: 4 }} onRequestDelete={ this.handleTagDelete.bind(this, tag) }>
        <span>{ tag }</span>
        <input type="hidden" name="tags[]" value={ tag }/>
      </Chip>
    )
  }

  renderTags() {
    if (this.state.selectedTags.length === 0) return (
      <input type="hidden" name="tags" value="" />
    )

    return (
      <div className="tags" style={{ display: 'flex', flexWrap: 'wrap' }}>
        { this.state.selectedTags.map(this.renderTag.bind(this)) }
      </div>
    )
  }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Tags"
          hintText="Type anything"
          dataSource={ this.props.tags }
          searchText={ this.state.tagSearchText }
          onNewRequest={ this.handleTagsInputSelect.bind(this) }
          onUpdateInput={ this.handleTagsInputUpdate.bind(this) }
        />
        { this.renderTags() }
      </div>
    )
  }

}

Tags.propTypes = {
  selectedTags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default Tags
