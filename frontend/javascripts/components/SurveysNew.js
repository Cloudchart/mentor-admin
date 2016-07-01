import React, { Component, PropTypes } from 'react'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


class SurveysNew extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isActive: true,
      isFetching: false,
    }
  }

  // helpers
  //
  getAttributes() {
    return {
      name: this.state.name,
      isActive: this.state.isActive,
    }
  }

  // handlers
  //
  handleInputChange(attr, event) {
    const value = attr === 'isActive' ? event.target.checked : event.target.value
    this.setState({ [attr]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { id, actions, onCreate } = this.props
    this.setState({ isFetching: true })

    actions.createSurvey(this.getAttributes()).then(() => {
      onCreate()
      this.setState({ isFetching: false })
    })
  }

  // renderers
  //
  render() {
    return (
      <form className="surveys-new" onSubmit={ this.handleSubmit.bind(this) }>
        <TextField
          value={ this.state.name }
          autoFocus={ true }
          floatingLabelText="Name"
          hintText="Enter survey name"
          name="name"
          fullWidth={ true }
          onChange={ this.handleInputChange.bind(this, 'name') }
        />

        <Toggle
          label="Is active"
          onToggle={ this.handleInputChange.bind(this, 'isActive') }
          toggled={ this.state.isActive }
        />

        <FlatButton
          type="submit"
          label="Create"
          style={ { float: 'right' } }
          primary={ true }
          disabled={ !this.state.name || this.state.isFetching }
        />
      </form>
    )
  }

}

SurveysNew.propTypes = {
  actions: PropTypes.object.isRequired,
}


export default SurveysNew
