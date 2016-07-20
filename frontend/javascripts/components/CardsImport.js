import React, { Component, PropTypes } from 'react'
import algoliasearch from 'algoliasearch'
import truncate from 'lodash/truncate'

import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy'

const client = algoliasearch(ENV['ALGOLIASEARCH_APP_ID'], ENV['ALGOLIASEARCH_API_KEY'])
const index = client.initIndex('Pin_production')

const paperStyle = {
  display: 'inline-block',
  width: '300px',
  margin: '10px',
  padding: '20px',
}

const searchOptions = {
  hitsPerPage: 1000,
  attributesToRetrieve: ['content', 'user', 'pinboard_tags', 'origin'],
  attributesToHighlight: 'none',
}


class CardsImport extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      open: false,
      hits: [],
      isFetching: false,
    }
  }

  // helpers
  //
  getDialogActions() {
    return [
      <FlatButton
        label="cancel"
        onTouchTap={ this.handleDialogClose.bind(this) }
      />,

      <FlatButton
        label="import"
        primary={ true }
        disabled={ this.state.hits.length === 0 }
        onTouchTap={ this.handleImportCards.bind(this) }
      />
    ]
  }

  // handlers
  //
  handleCardsImportClick(event) {
    this.setState({ open: true })
  }

  handleDialogClose(event) {
    this.setState({ open: false })
  }

  handleImportCards(event) {
    if (window.confirm(`You are about to import ${this.state.hits.length} cards, right?`)) {
      this.props.actions.importCards(this.props.courseId, {
        query: this.state.query,
        hits: this.state.hits,
      }).then(() => {
        this.props.actions.getCards(this.props.courseId)
      })

      this.setState({ open: false })
    }
  }

  handleSearch(event) {
    event.preventDefault()
    if (this.state.query.length < 2) return

    this.setState({ isFetching: true })
    index.search(this.state.query, searchOptions, (err, content) => {
      const hits = content.hits.filter(hit => hit.pinboard_tags.includes(content.query))
      this.setState({ hits: hits, isFetching: false })
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
    return (
      <span>
        <FlatButton
          label="Import cards"
          labelPosition="before"
          primary={ true }
          icon={ <ContentCopyIcon/> }
          onTouchTap={ this.handleCardsImportClick.bind(this) }
        />

        <Dialog
          title="Cards import"
          open={ this.state.open }
          autoScrollBodyContent={ true }
          actions={ this.getDialogActions() }
          onRequestClose={ this.handleDialogClose.bind(this) }
        >
          <form onSubmit={ this.handleSearch.bind(this) }>
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

          { this.renderResultsHeader(this.state.hits) }

          <div className="results" style={{ height: '600px' }}>
            { this.state.hits.slice(0, 20).map(this.renderResult.bind(this)) }
          </div>
        </Dialog>
      </span>
    )
  }

}

CardsImport.propTypes = {
  courseId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}


export default CardsImport
