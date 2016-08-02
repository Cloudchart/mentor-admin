import React, { Component, PropTypes } from 'react'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'


class Header extends Component {

  // handlers
  //
  handleMenuItemClick(path, event) {
    window.location.href = path
  }

  // renderers
  //
  render() {
    const title = this.props.title ? `${ENV['APP_NAME']} – ${this.props.title}` : ENV['APP_NAME']

    return (
      <AppBar
        title={ title }
        iconElementLeft={
          <IconMenu iconButtonElement={ <IconButton><MenuIcon color="#FFFFFF" /></IconButton> }>
            <MenuItem
              primaryText="Bot Owners"
              onTouchTap={ this.handleMenuItemClick.bind(this, '/bot_owners') }
            />
            <MenuItem
              primaryText="Bots"
              onTouchTap={ this.handleMenuItemClick.bind(this, '/bots') }
            />
            <MenuItem
              primaryText="Courses"
              onTouchTap={ this.handleMenuItemClick.bind(this, '/courses') }
            />
            <MenuItem
              primaryText="Scenarios"
              onTouchTap={ this.handleMenuItemClick.bind(this, '/scenarios') }
            />
            <MenuItem
              primaryText="Surveys"
              onTouchTap={ this.handleMenuItemClick.bind(this, '/surveys') }
            />
          </IconMenu>
        }
      />
    )
  }

}

Header.propTypes = {
  title: PropTypes.string,
}


export default Header
