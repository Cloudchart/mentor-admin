import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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


  // handlers
  //
  handleCreateCard(event) {
    this.props.actions.createCard(this.props.course.id)
  }

  // renderers
  //
  render() {
    console.log(this.props.cards);
    const { course, actions } = this.props

    return (
      <div>
        <ul className="cards">
          {
            this.getCards().map(item => {
              return <CardEdit key={ item.id } item={ item } actions={ actions } />
            })
          }
        </ul>

        <FlatButton
          label="Add card"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAdd/> }
          onTouchTap={ this.handleCreateCard.bind(this) }
        />
      </div>
    )
  }

}

CardsList.propTypes = {
  course: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardsList
