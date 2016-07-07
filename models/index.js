import thinky from 'thinky'
import dbconfig from '../config/database'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type


// models
//
export const Survey = Thinky.createModel('Survey',
  type.object().schema({
    id: type.string().uuid(4),
    name: type.string().default(''),
    slug: type.string(),
    isActive: type.boolean().default(false),
  }).removeExtra()
)

export const Question = Thinky.createModel('Question',
  type.object().schema({
    id: type.string().uuid(4),
    surveyId: type.string().uuid(4).required(),
    name: type.string(),
    explanation: type.string(),
  }).removeExtra()
)

// relations
//
Survey.hasMany(Question, 'questions', 'id', 'surveyId')
Question.belongsTo(Survey, 'survey', 'surveyId', 'id')
