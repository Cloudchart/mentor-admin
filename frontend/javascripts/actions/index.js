import create from './generator/create'
import update from './generator/update'
import destroy from './generator/delete'

import getQuestions from './questions/get'
import createQuestion from './questions/create'
import updateQuestion from './questions/update'
import deleteQuestion from './questions/delete'

export const surveysActions = {
  createSurvey: create('survey'),
  updateSurvey: update('survey'),
  deleteSurvey: destroy('survey'),
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}

export const botsActions = {
  createBot: create('bot'),
  updateBot: update('bot'),
  deleteBot: destroy('bot'),
}
