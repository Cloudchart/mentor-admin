import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { scenariosActions } from '../actions'

import Header from '../components/Header'
import ScenariosList from '../components/ScenariosList'


class ScenariosApp extends Component {

  render() {
    const { scenarios, scenarioActions, courses, tags, bot_owners, actions } = this.props

    return (
      <div className="container scenarios">
        <Header title="Scenarios"/>

        <div className="content">
          <ScenariosList
            scenarios={ scenarios }
            scenarioActions={ scenarioActions }
            courses={ courses }
            tags={ tags }
            bot_owners={ bot_owners }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

ScenariosApp.propTypes = {
  scenarios: PropTypes.array.isRequired,
  scenarioActions: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    scenarios: state.scenarios,
    scenarioActions: state.scenarioActions,
    courses: state.courses,
    tags: state.tags,
    bot_owners: state.bot_owners,
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
