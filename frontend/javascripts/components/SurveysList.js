import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

// import SurveysNew from './SurveysNew'
// import SurveysEdit from './SurveysEdit'


class SurveysList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSurveyId: null,
    }
  }

  // handlers
  //
  handleNew(event) {
    event.preventDefault()
    this.refs.modal.show()
  }

  handleCreate() {
    this.refs.modal.hide()
  }

  handleEdit(id, event) {
    event.preventDefault()
    this.setState({ selectedSurveyId: id })
  }

  handleReturn() {
    this.setState({ selectedSurveyId: null })
  }

  handleDestroy(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.destroySurvey(id)
  }

  // renderers
  //
  renderSurvey(survey) {
    return(
      <li key={ survey.id }>
        <span>{ survey.name }</span>
        <span> | </span>
        <span>{ survey.slug }</span>
        <span> | </span>
        { survey.isActive ? <i className="fa fa-check"/> : <i className="fa fa-times"/> }
        <span> | </span>
        <a href="" onClick={ this.handleEdit.bind(this, survey.id) }>Edit</a>
        <span> | </span>
        <a href="" onClick={ this.handleDestroy.bind(this, survey.id) }>Destroy</a>
      </li>
    )
  }

  render() {
    const { surveys, actions } = this.props

    return (
      <div>
        <h2>Surveys</h2>

        <ul className="surveys-list">
          { sortBy(surveys, survey => survey.name.toLowerCase()).map(this.renderSurvey.bind(this)) }
        </ul>

        <a href="" onClick={ this.handleNew.bind(this) }>New</a>
      </div>
    )
  }

}

SurveysList.propTypes = {
  surveys: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default SurveysList
