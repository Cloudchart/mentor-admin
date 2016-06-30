import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { surveysActions } from '../actions'

import Header from '../components/Header'
import SurveysList from '../components/SurveysList'


class SurveysApp extends Component {

  render() {
    const { surveys, actions } = this.props

    return (
      <div className="container surveys">
        <Header/>

        <div className="content">
          <SurveysList surveys={ surveys } actions={ actions } />
        </div>
      </div>
    )
  }
}

SurveysApp.propTypes = {
  surveys: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    surveys: state.surveys,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(surveysActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveysApp)
