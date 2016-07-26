import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
  componentWillReceiveProps(nextProps) {
    this.setState({ item: this.getItem(nextProps) })
  }

  // componentWillMount() {
  //   document.addEventListener('keydown', this.handleEscape.bind(this))
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleEscape.bind(this))
  // }

  // helpers
  //
  getItem(props) {
    return props.courses.find(course => course.id === props.courseId)
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
  }

  handleUpdate(event) {
    this.props.actions.updateCourse(this.state.item.id, this.refs.form)
  }

  handleBack(event) {
    this.props.onChange()
  }

  // handleEscape(event) {
  //   if (event.keyCode == 27) this.props.onChange()
  // }

  // renderers
  //
  renderOptionsForSelect(item) {
    return(
      <option key={ item.id } value={ item.id }>{ item.name }</option>
    )
  }

  render() {
    const { item } = this.state
    const { cards, tags, actions } = this.props

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

          <TextField
            defaultValue={ item.author }
            floatingLabelText="Author"
            hintText="Enter course author"
            name="author"
            onBlur={ this.handleUpdate.bind(this) }
          />
        </form>

        <h3>Cards</h3>

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
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  actions: PropTypes.object.isRequired,
}


export default CourseEdit
