import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coursesActions } from '../actions'

import Header from '../components/Header'
import CoursesList from '../components/CoursesList'


class CoursesApp extends Component {

  render() {
    const { courses, cards, tags, scenarios, actions } = this.props

    return (
      <div className="container courses">
        <Header title="Courses"/>

        <div className="content">
          <CoursesList
            cards={ cards }
            courses={ courses }
            tags={ tags }
            scenarios={ scenarios }
            actions={ actions }
          />
        </div>
      </div>
    )
  }
}

CoursesApp.propTypes = {
  courses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    courses: state.courses,
    tags: state.tags,
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
