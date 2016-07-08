import React, { Component, PropTypes } from 'react'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

import QuestionsList from './QuestionsList'


class SurveysEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.survey.name,
      isActive: props.survey.isActive,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleInputChange(attr, event) {
    const value = attr === 'isActive' ? event.target.checked : event.target.value
    this.setState({ [attr]: value })
  }

  handleUpdate(event) {
    const { survey, actions } = this.props
    actions.updateSurvey(survey.id, this.refs.form)
  }

  // renderers
  //
  render() {
    const { survey, questions, actions } = this.props

    return (
      <div>
        <form ref="form" className="surveys-edit" onSubmit={ this.handleSubmit }>
          <TextField
            value={ this.state.name }
            autoFocus={ !this.state.name }
            floatingLabelText="Name"
            hintText="Enter survey name"
            name="name"
            onChange={ this.handleInputChange.bind(this, 'name') }
            onBlur={ this.handleUpdate.bind(this) }
          />

          <Toggle
            label="Is active"
            labelPosition="right"
            name="isActive"
            toggled={ this.state.isActive }
            onToggle={ this.handleInputChange.bind(this, 'isActive') }
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>

        <h3>Questions</h3>
        <QuestionsList
          survey={ survey }
          questions={ questions }
          actions={ actions }
        />
      </div>
    )
  }

}

SurveysEdit.propTypes = {
  survey: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default SurveysEdit
