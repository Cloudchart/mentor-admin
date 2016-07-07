import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'


class Header extends Component {

  render() {
    const title = this.props.title ?
      `${process.env.APP_NAME} – ${this.props.title}` :
      process.env.APP_NAME

    return (
      <AppBar title={ title } />
    )
  }

}

Header.propTypes = {
  title: PropTypes.string,
}


export default Header
