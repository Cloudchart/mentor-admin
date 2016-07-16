import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'

import CardEdit from './CardEdit'


class CardsList extends Component {

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

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createCard(this.props.courseId)
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

        <ul className="cards">
          { this.getCards().map(this.renderItem.bind(this)) }
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
