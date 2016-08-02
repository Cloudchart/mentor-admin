import React, { Component, PropTypes } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import ScenarioEdit from './ScenarioEdit'


class ScenariosList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedItemId: '',
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createScenario().then(res => {
      this.setState({ selectedItemId: res.item.id })
    })

  }

  handleEditClose(event) {
    this.setState({ selectedItemId: '' })
  }

  handleEdit(item, event) {
    event.preventDefault()
    this.setState({ selectedItemId: item.id })
  }

  handleDelete(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.deleteScenario(id)
  }

  // renderers
  //
  renderItem(item) {
    return(
      <TableRow key={ item.id }>
        <TableRowColumn>{ item.type }</TableRowColumn>
        <TableRowColumn>
          {[
            <a key={1} href="" onClick={ this.handleEdit.bind(this, item) }>Edit</a>,
            <span key={2}> | </span>,
            <a key={3} href="" onClick={ this.handleDelete.bind(this, item.id) }>Delete</a>
          ]}
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { scenarios, scenarioActions, courses, tags, bot_owners, actions } = this.props
    const { selectedItemId } = this.state

    if (selectedItemId) {
      return (
        <ScenarioEdit
          scenarioId={ this.state.selectedItemId }
          scenarios={ scenarios }
          scenarioActions={ scenarioActions }
          courses={ courses }
          tags={ tags }
          bot_owners={ bot_owners }
          onChange={ this.handleEditClose.bind(this) }
          actions={ actions }
        />
      )
    } else {
      return (
        <div>
          <Table selectable={ false }>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { scenarios.map(this.renderItem.bind(this)) }
            </TableBody>
          </Table>

          <RaisedButton
            label="New"
            primary={ true }
            style={{ marginTop: '20px' }}
            onTouchTap={ this.handleNew.bind(this) }
          />
        </div>
      )
    }
  }
}

ScenariosList.propTypes = {
  scenarios: PropTypes.array.isRequired,
  scenarioActions: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default ScenariosList
