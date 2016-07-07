import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Question from './Question'


class QuestionsList extends Component {

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getQuestions(this.props.survey.id)
  }

  // helpers
  //
  getQuestions() {
    return this.props.questions.filter(question => question.surveyId === this.props.survey.id)
  }


  // handlers
  //
  handleCreateQuestion(event) {
    this.props.actions.createQuestion(this.props.survey.id)
  }

  // renderers
  //
  render() {
    const { survey, actions } = this.props

    return (
      <div>
        <ul className="questions">
          {
            this.getQuestions().map(question => {
              return <Question key={ question.id } question={ question } actions={ actions } />
            })
          }
        </ul>

        <FlatButton
          label="Add question"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAdd/> }
          onTouchTap={ this.handleCreateQuestion.bind(this) }
        />
      </div>
    )
  }

}

QuestionsList.propTypes = {
  survey: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default QuestionsList
