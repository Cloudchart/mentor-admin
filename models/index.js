import thinky from 'thinky'
import dbconfig from '../config/database'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type


export const Survey = Thinky.createModel('Survey',
  type.object().schema({
    id: type.string().uuid(4),
    name: type.string().default(''),
    slug: type.string(),
    isActive: type.boolean().default(false),
  }).removeExtra()
)
