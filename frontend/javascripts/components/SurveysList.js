import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import SurveysNew from './SurveysNew'
// import SurveysEdit from './SurveysEdit'


class SurveysList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSurveyId: null,
      isDialogOpened: false,
    }
  }

  // handlers
  //
  handleNew(event) {
    this.setState({ isDialogOpened: true })
  }

  handleDialogClose(event) {
    this.setState({ isDialogOpened: false })
  }

  handleEdit(id, event) {
    event.preventDefault()
    this.setState({ selectedSurveyId: id })
  }

  handleReturn() {
    this.setState({ selectedSurveyId: null })
  }

  handleDelete(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.deleteSurvey(id)
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
        <span>{ survey.isActive ? 'active' : 'inactive' }</span>
        <span> | </span>
        <a href="" onClick={ this.handleEdit.bind(this, survey.id) }>Edit</a>
        <span> | </span>
        <a href="" onClick={ this.handleDelete.bind(this, survey.id) }>Delete</a>
      </li>
    )
  }

  render() {
    const { surveys, actions } = this.props

    return (
      <div>
        <h2>Surveys</h2>

        <ul className="list">
          { sortBy(surveys, survey => survey.name.toLowerCase()).map(this.renderSurvey.bind(this)) }
        </ul>

        <RaisedButton
          label="New"
          primary={ true }
          onTouchTap={ this.handleNew.bind(this) }
        />

        <Dialog
          title="New survey"
          open={ this.state.isDialogOpened }
          children={
            <SurveysNew actions={ actions } onCreate={ this.handleDialogClose.bind(this) } />
          }
          onRequestClose={ this.handleDialogClose.bind(this) }
        />
      </div>
    )
  }

}

SurveysList.propTypes = {
  surveys: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default SurveysList
