import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

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

  handleEditClose(event) {
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
      <TableRow key={ survey.id }>
        <TableRowColumn>{ survey.name }</TableRowColumn>
        <TableRowColumn>{ survey.slug }</TableRowColumn>
        <TableRowColumn>{ survey.isActive ? 'Active' : 'Inactive' }</TableRowColumn>
        <TableRowColumn>
          {[
            <a key={1} href="" onClick={ this.handleEdit.bind(this, survey) }>Edit</a>,
            <span key={2}> | </span>,
            <a key={3} href="" onClick={ this.handleDelete.bind(this, survey.id) }>Delete</a>
          ]}
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { surveys, questions, actions } = this.props
    const { selectedSurvey, isAlertDialogOpen } = this.state

    return (
      <div>
        <Table selectable={ false }>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Slug</TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { sortBy(surveys.filter(survey => survey.name), 'name').map(this.renderSurvey.bind(this)) }
          </TableBody>
        </Table>

        <RaisedButton
          label="New"
          primary={ true }
          style={{ marginTop: '20px' }}
          onTouchTap={ this.handleNew.bind(this) }
        />

        <Dialog
          title={ selectedSurvey.name ? `${selectedSurvey.name} survey` : 'New survey' }
          open={ Object.keys(this.state.selectedSurvey).length > 0 }
          autoScrollBodyContent={ true }
          children={
            <SurveysEdit
              survey={ this.state.selectedSurvey }
              questions={ questions }
              actions={ actions }
            />
          }
          actions={
            <FlatButton
              label="Done"
              primary={ true }
              onTouchTap={ this.handleEditClose.bind(this) }
            />
          }
          onRequestClose={ this.handleEditClose.bind(this) }
        />
      </div>
    )
  }

}

SurveysList.propTypes = {
  surveys: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default SurveysList
