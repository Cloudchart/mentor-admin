import React, { Component, PropTypes } from 'react'
import algoliasearch from 'algoliasearch'
import truncate from 'lodash/truncate'

import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

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
      data: { hits: [] },
      isFetching: false,
    }
  }

  // handlers
  //
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.query.length < 2) return

    this.setState({ isFetching: true })
    index.search(this.state.query, { hitsPerPage: 1000 }, (err, content) => {
      this.setState({ data: content, isFetching: false })
    })
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value })
  }

  // renderers
  //
  renderResultsHeader(hits) {
    let text
    const hitsLength = hits.length

    if (this.state.isFetching) {
      text = 'Fetching...'
    } else if (hitsLength > 0) {
      const resultsPerPageNum = hitsLength >= 20 ? '20' : hitsLength
      text = `Showing ${resultsPerPageNum} of ${hitsLength} results`
    }

    return <h4>{ text }</h4>
  }

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
    const hits = this.state.data.hits.filter(hit => hit.pinboard_tags.includes(this.state.data.query))

    return (
      <div>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <TextField
            value={ this.state.query }
            floatingLabelText="Search"
            hintText="Type at least two characters"
            autoFocus={ true }
            onChange={ this.handleInputChange.bind(this) }
          />

          <FlatButton
            type="sublit"
            primary={ true }
            disabled={ this.state.isFetching }
          >
            <span>search</span>
          </FlatButton>
        </form>

        { this.renderResultsHeader(hits) }

        <div className="results" style={{ height: '600px' }}>
          { hits.slice(0, 20).map(this.renderResult.bind(this)) }
        </div>
      </div>
    )
  }

}

// CardsSearch.propTypes = {
// }


export default CardsSearch
