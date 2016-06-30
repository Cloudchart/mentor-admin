import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'


class Header extends Component {

  render() {
    return (
      <AppBar title={ process.env.APP_NAME } />
    )
  }

}


export default Header
