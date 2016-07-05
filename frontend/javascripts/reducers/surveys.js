import uniqBy from 'lodash/uniqBy'

export default function surveys(state = [], action) {
  switch (action.type) {
    case 'CREATE_SURVEY_RECEIVE':
      return uniqBy(state.concat(action.survey), 'id')
    case 'UPDATE_SURVEY_REQUEST':
      return state.map(survey => survey.id === action.id ?
        Object.assign(survey, { isFetching: true }) :
        survey
      )
    case 'UPDATE_SURVEY_RECEIVE':
      return state.map(survey => survey.id === action.id ?
        Object.assign(action.survey, { isFetching: false }) :
        survey
      )
    case 'UPDATE_SURVEY_ERROR':
      return state.map(survey => survey.id === action.id ?
        Object.assign(survey, { isFetching: false, error: action.error }) :
        survey
      )
    case 'DELETE_SURVEY_RECEIVE':
      return state.filter(survey => survey.id !== action.id)
    default:
      return state
  }
}
