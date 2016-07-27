import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'

import CardEdit from './CardEdit'
import CardsImport from './CardsImport'


class CardsList extends Component {

  // lifecycle
  //
  componentDidMount() {
    this.props.actions.getCards(this.props.course.id)
  }

  // handlers
  //
  handleCreate(event) {
    this.props.actions.createCard(this.props.course.id)
  }

  // renderers
  //
  renderItems() {
    if (this.props.cards.length === 0) return null
    return this.props.course.insights.map(this.renderItem.bind(this))
  }

  renderItem(insight) {
    const item = this.props.cards.find(item => item.id === insight.id)
    if (!item) return null

    return (
      <CardEdit
        key={ item.id }
        item={ item }
        course={ this.props.course }
        tags={ this.props.tags }
        actions={ this.props.actions }
      />
    )
  }

  render() {
    return (
      <div>
        <div className="cards">
          { this.renderItems() }
        </div>

        <FlatButton
          label="Add card"
          labelPosition="before"
          primary={ true }
          icon={ <ContentAddIcon/> }
          onTouchTap={ this.handleCreate.bind(this) }
        />

        <CardsImport
          courseId={ this.props.course.id }
          actions={ this.props.actions }
        />
      </div>
    )
  }

}

CardsList.propTypes = {
  course: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardsList
