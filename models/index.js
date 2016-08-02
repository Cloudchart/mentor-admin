import thinky from 'thinky'
import validator from 'validator'
import dbconfig from '../config/database'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type


export const r = Thinky.r

// models
//
export const Scenario = Thinky.createModel('scenarios',
  type.object().schema({
    id: type.string(),
    type: type.string(),
    actions: type.array().default([]),
  }).removeExtra()
)

export const Action = Thinky.createModel('actions',
  type.object().schema({
    id: type.string(),
    label: type.string(),
    action: type.string().enum(['input', 'message', 'sleep', 'course']).default('input'),
    text: type.string(),
    next: type.string(),
    timeout: type.number().integer(),
    branch: type.string(),
    keyboard: type.string(),
    course: type.string(),
  }).removeExtra()
)

export const Bot = Thinky.createModel('bots',
  type.object().schema({
    id: type.string(),
    scenario: type.object().schema({
      id: type.string(),
    }).removeExtra().default({}),
    name: type.string(),
    token: type.string(),
    type: type.string().enum(['messenger', 'telegram']).default('messenger'),
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
    origin: type.object().default({}),
    blocks: type.array().default([]),
    tags: type.array().default([]),
    created_at: type.date().default(r.now()),
    updated_at: type.date(),
  }).removeExtra()
)

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

Action.docOn('saving', doc => {
  doc.timeout = doc.timeout || undefined

  let attrs = ['branch', 'text', 'keyboard', 'timeout', 'course']
  let actionBasedAttrs = []

  if (doc.action === 'input') {
    actionBasedAttrs.push('branch')
  } else if (doc.action === 'message') {
    actionBasedAttrs.push('text', 'keyboard')
  } else if (doc.action === 'sleep') {
    actionBasedAttrs.push('timeout')
  } else if (doc.action === 'course') {
    actionBasedAttrs.push('course', 'branch')
  }

  attrs.forEach(attr => {
    if (!actionBasedAttrs.includes(attr)) doc[attr] = undefined
  })
})

// indexes
//
Card.ensureIndex('content')

// relations
//
Survey.hasMany(SurveyQuestion, 'questions', 'id', 'surveyId')
Survey.belongsTo(Course, 'course', 'courseId', 'id')

SurveyQuestion.hasMany(SurveyAnswer, 'answers', 'id', 'surveyQuestionId')
SurveyQuestion.belongsTo(Survey, 'survey', 'surveyId', 'id')

SurveyAnswer.belongsTo(SurveyQuestion, 'question', 'surveyQuestionId', 'id')
