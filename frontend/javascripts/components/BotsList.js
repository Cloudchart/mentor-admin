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

import BotEdit from './BotEdit'


class BotsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedBot: {},
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createBot().then(res => {
      this.setState({ selectedBot: res.item })
    })

  }

  handleEditClose(event) {
    this.setState({ selectedBot: {} })
  }

  handleEdit(bot, event) {
    event.preventDefault()
    this.setState({ selectedBot: bot })
  }

  handleDelete(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.deleteBot(id)
  }

  // renderers
  //
  renderBot(bot) {
    return(
      <TableRow key={ bot.id }>
        <TableRowColumn>{ bot.id }</TableRowColumn>
        <TableRowColumn>{ bot.name }</TableRowColumn>
        <TableRowColumn>{ bot.type }</TableRowColumn>
        <TableRowColumn>
          {[
            <a key={1} href="" onClick={ this.handleEdit.bind(this, bot) }>Edit</a>,
            <span key={2}> | </span>,
            <a key={3} href="" onClick={ this.handleDelete.bind(this, bot.id) }>Delete</a>
          ]}
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { bots, scenarios, bot_owners, actions } = this.props
    const { selectedBot } = this.state

    return (
      <div>
        <Table selectable={ false }>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { bots.map(this.renderBot.bind(this)) }
          </TableBody>
        </Table>

        <RaisedButton
          label="New"
          primary={ true }
          style={{ marginTop: '20px' }}
          onTouchTap={ this.handleNew.bind(this) }
        />

        <Dialog
          title={ selectedBot.name ? `${selectedBot.name} bot` : 'New bot' }
          open={ Object.keys(this.state.selectedBot).length > 0 }
          autoScrollBodyContent={ true }
          children={
            <BotEdit
              bot={ this.state.selectedBot }
              scenarios={ scenarios }
              bot_owners={ bot_owners }
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

BotsList.propTypes = {
  bots: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default BotsList
