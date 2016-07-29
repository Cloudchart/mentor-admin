import React, { Component, PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'


class SortablePaperActions extends Component {

  // helpers
  //
  getSelectedIndex() {
    return this.props.items.findIndex(i => i.id === this.props.selectedItemId)
  }

  // handlers
  //
  handleMove(direction, event) {
    let actions = this.props.items
    const selectedIndex = this.getSelectedIndex()
    const indexToBeReplaced = selectedIndex + direction

    actions = actions.map((action, index) => {
      if (index === selectedIndex) {
        return actions[indexToBeReplaced]
      } else if (index === indexToBeReplaced) {
        return actions[selectedIndex]
      } else {
        return action
      }
    })

    this.props.onChange(actions)
  }

  // renderers
  //
  renderMoveUpButton() {
    if (this.getSelectedIndex() === this.props.items.length - 1) return null

    return (
      <IconButton
        style={{ float: 'right' }}
        onTouchTap={ this.handleMove.bind(this, 1) }
      >
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  renderMoveDownButton() {
    if (this.getSelectedIndex() === 0) return null

    return (
      <IconButton
        style={{ float: 'right' }}
        onTouchTap={ this.handleMove.bind(this, -1) }
      >
        <ExpandLessIcon />
      </IconButton>
    )
  }

  render() {
    return (
      <div>
        { this.renderMoveUpButton() }
        { this.renderMoveDownButton() }
      </div>
    )
  }

}

SortablePaperActions.propTypes = {
  selectedItemId: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default SortablePaperActions
