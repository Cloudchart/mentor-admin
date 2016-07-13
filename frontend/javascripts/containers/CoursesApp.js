import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coursesActions } from '../actions'

import Header from '../components/Header'
import CoursesList from '../components/CoursesList'


class CoursesApp extends Component {

  render() {
    const { bots, courses, cards, scenarios, actions } = this.props

    return (
      <div className="container courses">
        <Header title="Courses"/>

        <div className="content">
          <CoursesList
            bots={ bots }
            cards={ cards }
            courses={ courses }
            scenarios={ scenarios }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

CoursesApp.propTypes = {
  bots: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    bots: state.bots,
    cards: state.cards,
    courses: state.courses,
    scenarios: state.scenarios,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(coursesActions, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursesApp)
