import getMany from './generator/getMany'
import create from './generator/create'
import update from './generator/update'
import destroy from './generator/delete'

import importCards from './cards/import'

const createBot = create('bot')
const updateBot = update('bot')
const deleteBot = destroy('bot')

const createBotOwner = create('bot_owner')
const updateBotOwner = update('bot_owner')
const deleteBotOwner = destroy('bot_owner')

const createScenario = create('scenario')
const updateScenario = update('scenario')
const deleteScenario = destroy('scenario')
const getActions = getMany('action', { parentModelName: 'scenario' })
const createAction = create('action', { parentModelName: 'scenario' })
const updateAction = update('action', { parentModelName: 'scenario' })
const deleteAction = destroy('action', { parentModelName: 'scenario' })

const createCourse = create('course')
const updateCourse = update('course')
const deleteCourse = destroy('course')
const getCards = getMany('card', { parentModelName: 'course' })
const createCard = create('card', { parentModelName: 'course' })
const updateCard = update('card', { parentModelName: 'course' })
const createBlock = create('block', { parentModelName: 'card' })
const updateBlock = update('block', { parentModelName: 'card' })
const deleteBlock = destroy('block', { parentModelName: 'card' })

const createSurvey = create('survey')
const updateSurvey = update('survey')
const deleteSurvey = destroy('survey')
const createQuestion = create('question', { parentModelName: 'survey' })
const updateQuestion = update('question', { parentModelName: 'survey' })
const deleteQuestion = destroy('question', { parentModelName: 'survey' })
const getQuestions = getMany('question', { parentModelName: 'survey' })


export const botsActions = { createBot, updateBot, deleteBot }
export const botOwnersActions = { createBotOwner, updateBotOwner, deleteBotOwner }

export const scenariosActions = {
  createScenario,
  updateScenario,
  deleteScenario,
  getActions,
  createAction,
  updateAction,
  deleteAction,
}

export const coursesActions = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCards,
  createCard,
  updateCard,
  importCards,
  createBlock,
  updateBlock,
  deleteBlock,
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

