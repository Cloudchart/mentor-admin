import thinky from 'thinky'
import dbconfig from '../config/database'
import { slugify } from 'underscore.string'

const Thinky = thinky(dbconfig[process.env.NODE_ENV])
const type = Thinky.type


export const Survey = Thinky.createModel('Survey',
  type.object().schema({
    id: type.string().uuid(4),
    name: type.string().alphanum().required().allowNull(false),
    slug: type.string().required().allowNull(false),
    isActive: type.boolean().default(false),
  }).removeExtra()
)

Survey.pre('save', function(next) {
  this.slug = slugify(this.name)
  this.isActive = !!this.isActive
  next()
})
