import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

// import AnswersList from './AnswersList'


class Question extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.question.name,
      explanation: props.question.explanation,
    }
  }

  // handlers
  //
  handleInputChange(attr, event) {
    this.setState({ [attr]: event.target.value })
  }

  handleSubmit(event) {
    this.props.actions.updateQuestion(this.props.question.id, this.refs.form)
  }

  handleDelete(event) {
    if (window.confirm('Are you sure?')) this.props.actions.deleteQuestion(this.props.question.id)
  }

  // renderers
  //
  render() {
    const { question, actions } = this.props

    return (
      <li>
        <form ref="form">
          <TextField
            name="name"
            value={ this.state.name }
            multiLine={ true }
            floatingLabelText="Name"
            hintText="Enter question name"
            onChange={ this.handleInputChange.bind(this, 'name') }
            onBlur={ this.handleSubmit.bind(this) }
          />

          <TextField
            name="explanation"
            value={ this.state.explanation }
            multiLine={ true }
            floatingLabelText="Explanation"
            hintText="Enter question explanation"
            onChange={ this.handleInputChange.bind(this, 'explanation') }
            onBlur={ this.handleSubmit.bind(this) }
          />

          <IconButton
            iconStyle={{ width: '20px', height: '20px' }}
            onTouchTap={ this.handleDelete.bind(this) }
          >
            <ActionDelete />
          </IconButton>
        </form>
      </li>
    )
  }

}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  // answers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default Question
