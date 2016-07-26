import thinky from 'thinky'
import validator from 'validator'
import dbconfig from '../config/database'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type
const r = Thinky.r


// models
//
export const Scenario = Thinky.createModel('scenarios',
  type.object().schema({
    id: type.string(),
    name: type.string(),
    actionsJSON: type.string(), // temp field
  }).removeExtra()
)

export const Action = Thinky.createModel('actions',
  type.object().schema({
    id: type.string(),
    scenarioId: type.string(),
    label: type.string(),
    action: type.string().enum(['input', 'message', 'sleep', 'course']),
    courseId: type.string().optional(),
    text: type.string().optional(),
    next: type.string().optional(),
    timeout: type.number().integer().optional(),
    branch: type.object().optional(),
  }).removeExtra()
)

export const Bot = Thinky.createModel('bots',
  type.object().schema({
    id: type.string(),
    scenarioId: type.string(),
    name: type.string(),
    isActive: type.boolean().default(false),
    keys: type.object().schema({
      facebookKey: type.string(),
      facebookVerificationKey: type.string(),
      telegramKey: type.string(),
    }).removeExtra(),
  }).removeExtra()
)

export const Course = Thinky.createModel('courses',
  type.object().schema({
    id: type.string(),
    name: type.string(),
    author: type.string(),
    insights: type.array().default([]),
    updated_at: type.date(),
  }).removeExtra()
)

export const Card = Thinky.createModel('insights',
  type.object().schema({
    id: type.string(),
    author: type.string(),
    content: type.string(),
    origin: type.object(),
    blocks: type.array().default([]),
    tags: type.array().default([]),
    negative_reaction: type.string(),
    positive_reaction: type.string(),
    created_at: type.date().default(r.now()),
    updated_at: type.date(),
  }).removeExtra()
)

// export const Card_Course = Thinky.createModel('Card_Course',
//   type.object().schema({
//     id: type.string(),
//     cardId: type.string().required(),
//     courseId: type.string().required(),
//     position: type.number().integer().default(0),
//   }).removeExtra()
// )

export const Block = Thinky.createModel('blocks',
  type.object().schema({
    id: type.string(),
    cardId: type.string(),
    type: type.string().enum(['text', 'image', 'video']).default('text'),
    position: type.number().integer().default(0),
    content: type.string(),
  }).removeExtra()
)

// export const Tag = Thinky.createModel('Tag',
//   type.object().schema({
//     id: type.string(),
//     name: type.string(),
//   }).removeExtra()
// )

export const Survey = Thinky.createModel('surveys',
  type.object().schema({
    id: type.string(),
    courseId: type.string(),
    name: type.string(),
    slug: type.string(),
    isActive: type.boolean().default(false),
    createdAt: type.date().default(r.now()),
  }).removeExtra()
)

export const SurveyQuestion = Thinky.createModel('survey_questions',
  type.object().schema({
    id: type.string(),
    surveyId: type.string().required(),
    name: type.string(),
    explanation: type.string(),
  }).removeExtra()
)

export const SurveyAnswer = Thinky.createModel('survey_answers',
  type.object().schema({
    id: type.string(),
    surveyQuestionId: type.string().required(),
    name: type.string(),
    isCorrect: type.boolean().default(false),
  }).removeExtra()
)

// hooks
//
Course.docOn('saving', doc => {
  doc.name = doc.name || null
  doc.updated_at = new Date()
})

Card.docOn('saving', doc => {
  doc.updated_at = new Date()
})

// indexes
//
Card.ensureIndex('content')
// Tag.ensureIndex('name')

// relations
//
Scenario.hasMany(Action, 'actions', 'id', 'scenarioId')

Action.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

Bot.hasMany(Course, 'courses', 'id', 'botId')
Bot.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

// Course.hasMany(Card_Course, 'cards', 'id', 'courseId')
// Course.hasMany(Card, 'insights', 'id', 'courseId')
// Course.belongsTo(Bot, 'bot', 'botId', 'id')
// Course.belongsTo(Scenario, 'scenario', 'scenarioId', 'id')

// Card.hasAndBelongsToMany(Tag, 'tags', 'id', 'id')
// Card.hasMany(Block, 'blocks', 'id', 'cardId')
// Card.hasMany(Card_Course, 'courses', 'id', 'cardId')
// Card.belongsTo(Course, 'course', 'courseId', 'id')

// Card_Course.belongsTo(Course, 'course', 'courseId', 'id')
// Card_Course.belongsTo(Card, 'card', 'cardId', 'id')

// Block.belongsTo(Card, 'card', 'cardId', 'id')

// Tag.hasAndBelongsToMany(Card, 'cards', 'id', 'id')

Survey.hasMany(SurveyQuestion, 'questions', 'id', 'surveyId')
Survey.belongsTo(Course, 'course', 'courseId', 'id')

SurveyQuestion.hasMany(SurveyAnswer, 'answers', 'id', 'surveyQuestionId')
SurveyQuestion.belongsTo(Survey, 'survey', 'surveyId', 'id')

SurveyAnswer.belongsTo(SurveyQuestion, 'question', 'surveyQuestionId', 'id')
