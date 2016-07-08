import thinky from 'thinky'
import validator from 'validator'
import dbconfig from '../config/database'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type
const r = Thinky.r


// models
//
export const Scenario = Thinky.createModel('Scenario',
  type.object().schema({
    id: type.string(),
    name: type.string(),
  }).removeExtra()
)

export const ScenarioAction = Thinky.createModel('ScenarioAction',
  type.object().schema({
    id: type.string(),
    scenarioId: type.string(),
    label: type.string(),
    action: type.string().enum(['input', 'message', 'sleep', 'course']),
    course: type.string().optional(),
    text: type.string().optional(),
    next: type.string().optional(),
    timeout: type.number().integer().optional(),
    branch: type.object().optional(),
  }).removeExtra()
)

export const Bot = Thinky.createModel('Bot',
  type.object().schema({
    id: type.string(),
    scenarioId: type.string(),
    name: type.string(),
    isActive: type.boolean().default(false),
    keys: type.object().schema({
      facebookKey: type.string(),
      telegramKey: type.string(),
    }),
  }).removeExtra()
)

export const Course = Thinky.createModel('Course',
  type.object().schema({
    id: type.string(),
    botId: type.string(),
    scenarioId: type.string(),
    name: type.string(),
    isActive: type.boolean().default(false),
  }).removeExtra()
)

export const Card = Thinky.createModel('Card',
  type.object().schema({
    id: type.string(),
    text: type.string(),
    originUrl: type.string().validator(validator.isURL),
    author: type.string(),
  }).removeExtra()
)

export const Block = Thinky.createModel('Block',
  type.object().schema({
    id: type.string(),
    cardId: type.string(),
    type: type.string().enum(['text', 'image', 'video']),
    position: type.number().integer(),
    content: type.object(),
  }).removeExtra()
)

export const Tag = Thinky.createModel('Tag',
  type.object().schema({
    id: type.string(),
    name: type.string(),
  }).removeExtra()
)

export const Survey = Thinky.createModel('Survey',
  type.object().schema({
    id: type.string(),
    courseId: type.string(),
    name: type.string().default(''),
    slug: type.string(),
    isActive: type.boolean().default(false),
    createdAt: type.date().default(r.now()),
  }).removeExtra()
)

export const SurveyQuestion = Thinky.createModel('SurveyQuestion',
  type.object().schema({
    id: type.string(),
    surveyId: type.string().required(),
    name: type.string(),
    explanation: type.string(),
  }).removeExtra()
)

export const SurveyAnswer = Thinky.createModel('SurveyAnswer',
  type.object().schema({
    id: type.string(),
    surveyQuestionId: type.string().required(),
    name: type.string(),
    isCorrect: type.boolean().default(false),
  }).removeExtra()
)

// relations
//
Scenario.hasMany(ScenarioAction, 'actions', 'id', 'scenarioId')

ScenarioAction.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

Bot.hasMany(Course, 'courses', 'id', 'botId')
Bot.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

Course.hasAndBelongsToMany(Card, 'cards', 'id', 'id')
Course.belongsTo(Bot, 'bot', 'botId', 'id')
Course.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

Card.hasAndBelongsToMany(Course, 'courses', 'id', 'id')
Card.hasAndBelongsToMany(Tag, 'tags', 'id', 'id')
Card.hasMany(Block, 'blocks', 'id', 'cardId')

Block.belongsTo(Card, 'card', 'cardId', 'id')

Tag.hasAndBelongsToMany(Card, 'cards', 'id', 'id')

Survey.hasMany(SurveyQuestion, 'questions', 'id', 'surveyId')
Survey.belongsTo(Course, 'course', 'courseId', 'id')

SurveyQuestion.hasMany(SurveyAnswer, 'answers', 'id', 'surveyQuestionId')
SurveyQuestion.belongsTo(Survey, 'survey', 'surveyId', 'id')

SurveyAnswer.belongsTo(SurveyQuestion, 'question', 'surveyQuestionId', 'id')
