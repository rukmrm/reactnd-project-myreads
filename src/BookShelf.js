import React from 'react'
import Book from './Book.js'

class BookShelf extends React.Component {
  state = {}

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelfBooks.map(x => {
              return (
                <Book
                  key={x.id}
                  className="book"
                  bookInfo={x}
                  handleBookShelfChange={this.props.handleBookShelfChange}
                />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
