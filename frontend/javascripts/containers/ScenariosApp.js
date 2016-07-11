import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { scenariosActions } from '../actions'

import Header from '../components/Header'
import ScenariosList from '../components/ScenariosList'


class ScenariosApp extends Component {

  render() {
    const { scenarios, actions } = this.props

    return (
      <div className="container scenarios">
        <Header title="Scenarios"/>

        <div className="content">
          <ScenariosList scenarios={ scenarios } actions={ actions } />
        </div>
      </div>
    )
  }
}

ScenariosApp.propTypes = {
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    scenarios: state.scenarios,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(scenariosActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenariosApp)
