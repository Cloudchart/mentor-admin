import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { botsActions } from '../actions'

import Header from '../components/Header'
import BotsList from '../components/BotsList'


class BotsApp extends Component {

  render() {
    const { bots, questions, actions } = this.props

    return (
      <div className="container bots">
        <Header title="Bots"/>

        <div className="content">
          <BotsList
            bots={ bots }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

BotsApp.propTypes = {
  bots: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    bots: state.bots,
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
