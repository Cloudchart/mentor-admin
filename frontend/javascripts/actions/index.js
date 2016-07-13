import getMany from './generator/getMany'
import create from './generator/create'
import update from './generator/update'
import destroy from './generator/delete'

const createBot = create('bot')
const updateBot = update('bot')
const deleteBot = destroy('bot')

const createScenario = create('scenario')
const updateScenario = update('scenario')
const deleteScenario = destroy('scenario')

const createCourse = create('course')
const updateCourse = update('course')
const deleteCourse = destroy('course')
const createCard = create('card', { parentModelName: 'course' })
const updateCard = update('card', { parentModelName: 'course' })
const deleteCard = destroy('card', { parentModelName: 'course' })
const getCards = getMany('card', { parentModelName: 'course' })

const createSurvey = create('survey')
const updateSurvey = update('survey')
const deleteSurvey = destroy('survey')
const createQuestion = create('question', { parentModelName: 'survey' })
const updateQuestion = update('question', { parentModelName: 'survey' })
const deleteQuestion = destroy('question', { parentModelName: 'survey' })
const getQuestions = getMany('question', { parentModelName: 'survey' })


export const botsActions = { createBot, updateBot, deleteBot }
export const scenariosActions = { createScenario, updateScenario, deleteScenario }

export const coursesActions = {
  createCourse,
  updateCourse,
  deleteCourse,
  createCard,
}

export const surveysActions = {
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}

