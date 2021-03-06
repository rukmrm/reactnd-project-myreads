import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'

class BookSearchPage extends React.Component {
  state = { value: this.props.searchQuery }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={this.props.handleCloseSearchPage}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.props.searchQuery}
              placeholder="Search by subject"
              onChange={e => this.props.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults
              ? this.props.searchResults.map(x => {
                  return (
                    <Book
                      key={x.id}
                      className="book"
                      bookInfo={x}
                      uponBookShelfChange={this.props.uponBookShelfChange}
                    />
                  )
                })
              : ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearchPage
