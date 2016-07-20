import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'

import CardEdit from './CardEdit'
import CardsImport from './CardsImport'


class CardsList extends Component {

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getCards(this.props.courseId)
  }

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createCard(this.props.courseId)
  }

  // renderers
  //
  renderItems() {
    return this.props.cards
      .filter(item => item.courseId === this.props.courseId)
      .sort((a, b) => a.position - b.position)
      .map(this.renderItem.bind(this))
  }

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

        <CardsImport
          courseId={ this.props.courseId }
          actions={ this.props.actions }
        />

        <ul className="cards">
          { this.renderItems() }
        </ul>
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
