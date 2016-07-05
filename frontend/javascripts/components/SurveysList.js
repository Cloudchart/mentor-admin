import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import SurveysEdit from './SurveysEdit'


class SurveysList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSurvey: {},
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createSurvey().then(res => {
      this.setState({ selectedSurvey: res.survey })
    })

  }

  handleDialogClose(event) {
    this.setState({ selectedSurvey: {} })
  }

  handleEdit(survey, event) {
    event.preventDefault()
    this.setState({ selectedSurvey: survey })
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
        <a href="" onClick={ this.handleEdit.bind(this, survey) }>Edit</a>
        <span> | </span>
        <a href="" onClick={ this.handleDelete.bind(this, survey.id) }>Delete</a>
      </li>
    )
  }

  render() {
    const { surveys, actions } = this.props
    const { selectedSurvey } = this.state

    return (
      <div>
        <h2>Surveys</h2>

        <ul className="list">
          { sortBy(surveys.filter(survey => survey.name), 'name').map(this.renderSurvey.bind(this)) }
        </ul>

        <RaisedButton
          label="New"
          primary={ true }
          onTouchTap={ this.handleNew.bind(this) }
        />

        <Dialog
          title={ selectedSurvey.name ? `${selectedSurvey.name} survey` : 'New survey' }
          open={ Object.keys(this.state.selectedSurvey).length > 0 }
          children={
            <SurveysEdit
              survey={ this.state.selectedSurvey }
              actions={ actions }
            />
          }
          actions={
            <FlatButton
              label="Done"
              primary={ true }
              onTouchTap={ this.handleDialogClose.bind(this) }
            />
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
