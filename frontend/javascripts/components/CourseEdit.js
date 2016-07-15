import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import ContentAddIcon from 'material-ui/svg-icons/content/add'

// https://github.com/callemall/material-ui/issues/3151
// import SelectField from 'material-ui/SelectField'

import CardsList from './CardsList'


class CourseEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item: this.getItem(props),
    }
  }

  // lifecycle
  //
  componentWillMount() {
    document.addEventListener('keydown', this.handleEscape.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ item: this.getItem(nextProps) })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape.bind(this))
  }

  // helpers
  //
  getItem(props) {
    return props.courses.find(course => course.id === props.courseId)
  }

  // handlers
  //
  handleEscape(event) {
    if (event.keyCode == 27) this.props.onChange()
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleCreateCard(event) {
    this.props.actions.createCard(this.state.item.id)
  }

  handleUpdate(event) {
    this.props.actions.updateCourse(this.state.item.id, this.refs.form)
  }

  handleBack(event) {
    this.props.onChange()
  }

  // renderers
  //
  renderOptionsForSelect(item) {
    return(
      <option key={ item.id } value={ item.id }>{ item.name }</option>
    )
  }

  render() {
    const { item } = this.state
    const { bots, cards, scenarios, tags, actions } = this.props

    return (
      <div>
        <RaisedButton
          label="Back"
          style={{ marginBottom: '30px' }}
          onTouchTap={ this.handleBack.bind(this) }
        />

        <h3>{ item.name ? `${item.name} course` : 'New course' }</h3>

        <form ref="form" className="course-edit" onSubmit={ this.handleSubmit }>
          <TextField
            defaultValue={ item.id }
            floatingLabelText="ID"
            disabled={ true }
          />
          <br/>

          <TextField
            defaultValue={ item.name }
            autoFocus={ !item.name }
            floatingLabelText="Name"
            hintText="Enter course name"
            name="name"
            onBlur={ this.handleUpdate.bind(this) }
          />

          <Toggle
            label="Is active"
            labelPosition="right"
            name="isActive"
            defaultToggled={ item.isActive }
            onBlur={ this.handleUpdate.bind(this) }
          />

          <label>
            <span>Bot</span>
            <select
              name="botId"
              defaultValue={ item.botId }
              onBlur={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { sortBy(bots, 'name').map(this.renderOptionsForSelect.bind(this)) }
            </select>
          </label>

          <label>
            <span>Scenario</span>
            <select
              name="scenarioId"
              defaultValue={ item.scenarioId }
              onBlur={ this.handleUpdate.bind(this) }
            >
              <option></option>
              { sortBy(scenarios, 'name').map(this.renderOptionsForSelect.bind(this)) }
            </select>
          </label>
        </form>

        <h3>Cards</h3>

        <FlatButton
          label="Add card"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAddIcon/> }
          onTouchTap={ this.handleCreateCard.bind(this) }
        />

        <CardsList
          course={ item }
          cards={ cards }
          tags={ tags }
          actions={ actions }
        />
      </div>
    )
  }

}

CourseEdit.propTypes = {
  courseId: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  bots: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  actions: PropTypes.object.isRequired,
}


export default CourseEdit
