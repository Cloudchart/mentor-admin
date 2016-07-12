import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

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
      selectedItem: {},
    }
  }

  // handlers
  //
  handleNew(event) {
    this.props.actions.createCourse().then(res => {
      this.setState({ selectedItem: res.item })
    })

  }

  handleEditClose(event) {
    this.setState({ selectedItem: {} })
  }

  handleEdit(item, event) {
    event.preventDefault()
    this.setState({ selectedItem: item })
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
        <TableRowColumn>{ item.name }</TableRowColumn>
        <TableRowColumn>{ item.isActive ? 'Active' : 'Inactive' }</TableRowColumn>
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
    const { bots, courses, scenarios, actions } = this.props
    const { selectedItem, isAlertDialogOpen } = this.state

    return (
      <div>
        <Table selectable={ false }>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
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

        <Dialog
          title={ selectedItem.name ? `${selectedItem.name} course` : 'New course' }
          open={ Object.keys(this.state.selectedItem).length > 0 }
          autoScrollBodyContent={ true }
          children={
            <CourseEdit
              item={ this.state.selectedItem }
              bots={ bots }
              scenarios={ scenarios }
              actions={ actions }
            />
          }
          actions={
            <FlatButton
              label="Done"
              primary={ true }
              onTouchTap={ this.handleEditClose.bind(this) }
            />
          }
          onRequestClose={ this.handleEditClose.bind(this) }
        />
      </div>
    )
  }

}

CoursesList.propTypes = {
  bots: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CoursesList
