import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

// import AnswersList from './AnswersList'


class QuestionEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.question.name,
      explanation: props.question.explanation,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
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
        <form ref="form" onSubmit={ this.handleSubmit }>
          <TextField
            name="name"
            defaultValue={ this.state.name }
            multiLine={ true }
            floatingLabelText="Name"
            hintText="Enter question name"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <TextField
            name="explanation"
            defaultValue={ this.state.explanation }
            multiLine={ true }
            floatingLabelText="Explanation"
            hintText="Enter question explanation"
            onBlur={ this.handleUpdate.bind(this) }
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

QuestionEdit.propTypes = {
  question: PropTypes.object.isRequired,
  // answers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default QuestionEdit
