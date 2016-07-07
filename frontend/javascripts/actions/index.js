import createSurvey from './surveys/create'
import updateSurvey from './surveys/update'
import deleteSurvey from './surveys/delete'

import getQuestions from './questions/get'
import createQuestion from './questions/create'
import updateQuestion from './questions/update'
import deleteQuestion from './questions/delete'

export const surveysActions = {
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}
