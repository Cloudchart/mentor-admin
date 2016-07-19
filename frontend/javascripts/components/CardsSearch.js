import React, { Component, PropTypes } from 'react'
import algoliasearch from 'algoliasearch'
import truncate from 'lodash/truncate'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'

const client = algoliasearch(ENV['ALGOLIASEARCH_APP_ID'], ENV['ALGOLIASEARCH_API_KEY'])
const index = client.initIndex('Pin_production')

const paperStyle = {
  display: 'inline-block',
  width: '300px',
  margin: '10px',
  padding: '20px',
}


class CardsSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      data: [],
    }
  }

  // handlers
  //
  handleInputChange(event) {
    const query = event.target.value
    this.setState({ query: query })
    if (query.length >= 3) {
      index.search(query, (err, content) => this.setState({ data: content.hits }))
    }
  }

  // renderers
  //
  renderTag(tag, index) {
    return <Chip key={ index } style={{ margin: 4 }}>{ tag }</Chip>
  }

  renderResult(item, index) {
    return (
      <Paper key={ index } style={ paperStyle }>
        <div style={{ marginBottom: '20px' }}>{ item.content }</div>
        <div style={{ marginBottom: '20px' }}>{ item.user.name }</div>
        <div className="tags" style={{ display: 'flex', flexWrap: 'wrap' }}>
          { item.pinboard_tags.map(this.renderTag) }
        </div>
      </Paper>
    )
  }

  render() {
    return (
      <div>
        <TextField
          value={ this.state.query }
          floatingLabelText="Search"
          hintText="Type anything"
          autoFocus={ true }
          onChange={ this.handleInputChange.bind(this) }
        />

        <div className="results" style={{ height: '600px' }}>
          { this.state.data.map(this.renderResult.bind(this)) }
        </div>
      </div>
    )
  }

}

// CardsSearch.propTypes = {
// }


export default CardsSearch
