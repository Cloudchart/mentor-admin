import React, { Component, PropTypes } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import BotOwnerEdit from './BotOwnerEdit'


class BotOwnersList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedItem: {},
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createBotOwner().then(res => {
      this.setState({ selectedItem: res.item })
    })

  }

  handleEditClose(event) {
    this.setState({ selectedItem: {} })
  }

  handleEdit(item, event) {
    event.preventDefault()
    this.setState({ selectedItem: item })
  }

  handleDelete(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.deleteBotOwner(id)
  }

  // renderers
  //
  renderItem(item) {
    return(
      <TableRow key={ item.id }>
        <TableRowColumn>{ item.id }</TableRowColumn>
        <TableRowColumn>{ item.name }</TableRowColumn>
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
    const { bot_owners, actions } = this.props
    const { selectedItem } = this.state

    return (
      <div>
        <Table selectable={ false }>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { bot_owners.map(this.renderItem.bind(this)) }
          </TableBody>
        </Table>

        <RaisedButton
          label="New"
          primary={ true }
          style={{ marginTop: '20px' }}
          onTouchTap={ this.handleNew.bind(this) }
        />

        <Dialog
          title={ selectedItem.name ? `${selectedItem.name} bot owner` : 'New bot owner' }
          open={ Object.keys(this.state.selectedItem).length > 0 }
          autoScrollBodyContent={ true }
          children={
            <BotOwnerEdit
              item={ this.state.selectedItem }
              actions={ actions }
            />
          }
          actions={
            <FlatButton
              label="Done"
              primary={ true }
              onTouchTap={ this.handleEditClose.bind(this) }
            />
          }
          onRequestClose={ this.handleEditClose.bind(this) }
        />
      </div>
    )
  }

}

BotOwnersList.propTypes = {
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotOwnersList
