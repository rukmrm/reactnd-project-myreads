import React from 'react'

class BookSearchPage extends React.Component {
  state = { value: this.props.searchQuery }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.handleShowSearchPage}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.props.searchQuery}
              placeholder="Search by title or author"
              onChange={e => this.props.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults
              ? this.props.searchResults.map(x => {
                  return <li key={x.id}> {x.title}</li>
                })
              : ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearchPage
