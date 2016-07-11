import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { botsActions } from '../actions'

import Header from '../components/Header'
import BotsList from '../components/BotsList'


class BotsApp extends Component {

  render() {
    const { bots, scenarios, actions } = this.props

    return (
      <div className="container bots">
        <Header title="Bots"/>

        <div className="content">
          <BotsList
            bots={ bots }
            scenarios={ scenarios }
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
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    bots: state.bots,
    scenarios: state.scenarios,
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
