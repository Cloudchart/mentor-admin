import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { botsActions } from '../actions'

import Header from '../components/Header'
import BotsList from '../components/BotsList'


class BotsApp extends Component {

  render() {
    const { bots, scenarios, bot_owners, actions } = this.props

    return (
      <div className="container bots">
        <Header title="Bots"/>

        <div className="content">
          <BotsList
            bots={ bots }
            scenarios={ scenarios }
            bot_owners={ bot_owners }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

BotsApp.propTypes = {
  bots: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    bots: state.bots,
    scenarios: state.scenarios,
    bot_owners: state.bot_owners,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(botsActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BotsApp)
