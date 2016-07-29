import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'

import ActionEdit from './ActionEdit'


class ActionsList extends Component {

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getActions(this.props.scenario.id)
  }

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createAction(this.props.scenario.id)
  }

  // renderers
  //
  renderItems() {
    if (this.props.scenarioActions.length === 0) return null
    return this.props.scenario.actions.map(this.renderItem.bind(this))
  }

  renderItem(action) {
    const item = this.props.scenarioActions.find(item => item.id === action.id)
    if (!item) return null

    return (
      <ActionEdit
        key={ item.id }
        item={ item }
        scenario={ this.props.scenario }
        actions={ this.props.actions }
      />
    )
  }

  render() {
    return (
      <div>
        <div className="actions">
          { this.renderItems() }
        </div>

        <FlatButton
          label="Add action"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAddIcon/> }
          onTouchTap={ this.handleCreate.bind(this) }
        />
      </div>
    )
  }

}

ActionsList.propTypes = {
  scenario: PropTypes.object.isRequired,
  scenarioActions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default ActionsList
