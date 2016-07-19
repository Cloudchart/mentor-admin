import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import ContentAddIcon from 'material-ui/svg-icons/content/add'
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy'

import CardEdit from './CardEdit'
import CardsSearch from './CardsSearch'


class CardsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isCardsSearchDialogOpen: false,
    }
  }

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getCards(this.props.courseId)
  }

  // helpers
  //
  getCards() {
    const { cards, courseId } = this.props
    return sortBy(cards.filter(item => item.courseId === courseId), 'position')
  }

  getCardsSearchActions() {
    return [
      <FlatButton
        label="cancel"
        onTouchTap={ this.handleCardsSearchClose.bind(this) }
      />,

      <FlatButton
        label="import"
        primary={ true }
        onTouchTap={ this.handleImportCards.bind(this) }
      />
    ]
  }

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createCard(this.props.courseId)
  }

  handleCardsSearchClick(event) {
    this.setState({ isCardsSearchDialogOpen: true })
  }

  handleCardsSearchClose(event) {
    this.setState({ isCardsSearchDialogOpen: false })
  }

  handleImportCards(event) {
    this.setState({ isCardsSearchDialogOpen: false })
  }

  // renderers
  //
  renderItem(item) {
    const { cards, tags, actions } = this.props

    return (
      <CardEdit
        key={ item.id }
        cardId={ item.id }
        cards={ cards }
        tags={ tags }
        actions={ actions }
      />
    )
  }

  render() {
    return (
      <div>
        <FlatButton
          label="Add card"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAddIcon/> }
          onTouchTap={ this.handleCreate.bind(this) }
        />

        <FlatButton
          label="Import cards"
          labelPosition="before"
          primary={ true }
          icon={ <ContentCopyIcon/> }
          onTouchTap={ this.handleCardsSearchClick.bind(this) }
        />

        <ul className="cards">
          { this.getCards().map(this.renderItem.bind(this)) }
        </ul>

        <Dialog
          title="Cards import"
          open={ this.state.isCardsSearchDialogOpen }
          autoScrollBodyContent={ true }
          actions={ this.getCardsSearchActions() }
          onRequestClose={ this.handleCardsSearchClose.bind(this) }
        >
          <CardsSearch/>
        </Dialog>

      </div>
    )
  }

}

CardsList.propTypes = {
  courseId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardsList
