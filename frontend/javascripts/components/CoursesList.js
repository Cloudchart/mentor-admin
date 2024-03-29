import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import RaisedButton from 'material-ui/RaisedButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import CourseEdit from './CourseEdit'


class CoursesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedItemId: '',
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createCourse().then(res => {
      this.setState({ selectedItemId: res.item.id })
    })

  }

  handleEditClose(event) {
    this.setState({ selectedItemId: '' })
  }

  handleEdit(item, event) {
    event.preventDefault()
    this.setState({ selectedItemId: item.id })
  }

  handleDelete(id, event) {
    event.preventDefault()
    if (window.confirm('Are you sure?')) this.props.actions.deleteCourse(id)
  }

  // renderers
  //
  renderCourse(item) {
    return(
      <TableRow key={ item.id }>
        <TableRowColumn>{ item.id }</TableRowColumn>
        <TableRowColumn>{ item.name }</TableRowColumn>
        <TableRowColumn>{ item.author }</TableRowColumn>
        <TableRowColumn>
          {[
            <a key={1} href="" onClick={ this.handleEdit.bind(this, item) }>Edit</a>,
            <span key={2}> | </span>,
            <a key={3} href="" onClick={ this.handleDelete.bind(this, item.id) }>Delete</a>
          ]}
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { courses, cards, tags, scenarios, bot_owners, actions } = this.props
    const { selectedItemId } = this.state

    if (selectedItemId) {
      return (
        <CourseEdit
          courseId={ selectedItemId }
          courses={ courses }
          cards={ cards }
          tags={ tags }
          scenarios={ scenarios }
          bot_owners={ bot_owners }
          onChange={ this.handleEditClose.bind(this) }
          actions={ actions }
        />
      )
    } else {
      return (
        <div>
          <Table selectable={ false }>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Author</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { sortBy(courses.filter(item => item.name), 'name').map(this.renderCourse.bind(this)) }
            </TableBody>
          </Table>

          <RaisedButton
            label="New"
            primary={ true }
            style={{ marginTop: '20px' }}
            onTouchTap={ this.handleNew.bind(this) }
          />
        </div>
      )
    }
  }
}

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  bot_owners: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CoursesList
