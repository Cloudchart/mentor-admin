import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { botOwnersActions } from '../actions'

import Header from '../components/Header'
import BotOwnersList from '../components/BotOwnersList'


class BotOwnersApp extends Component {

  render() {
    const { bot_owners, actions } = this.props

    return (
      <div className="container">
        <Header title="Bot Owners"/>

        <div className="content">
          <BotOwnersList
            bot_owners={ bot_owners }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

BotOwnersApp.propTypes = {
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    bot_owners: state.bot_owners,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(botOwnersActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BotOwnersApp)
