import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'

import BlockEdit from './BlockEdit'


class BlocksList extends Component {

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createBlock(this.props.cardCourseId)
  }

  // renderers
  //
  renderItem(item) {
    return <BlockEdit key={ item.id } item={ item } actions={ this.props.actions } />
  }

  render() {
    return (
      <div>
        <FlatButton
          label="Add block"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAddIcon/> }
          onTouchTap={ this.handleCreate.bind(this) }
        />

        <ul className="blocks">
          { sortBy(this.props.items, 'position').map(this.renderItem.bind(this)) }
        </ul>
      </div>
    )
  }

}

BlocksList.propTypes = {
  cardCourseId: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BlocksList
