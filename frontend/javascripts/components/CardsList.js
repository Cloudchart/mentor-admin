import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import CardEdit from './CardEdit'


class CardsList extends Component {

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getCards(this.props.course.id)
  }

  // helpers
  //
  getCards() {
    const { cards, course } = this.props
    return (
      sortBy(cards.filter(item => item.courseId === course.id), 'position')
    )
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
    return <ul className="cards">{ this.getCards().map(this.renderItem.bind(this)) }</ul>
  }

}

CardsList.propTypes = {
  course: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardsList
