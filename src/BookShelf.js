import React from 'react'
import Book from './Book.js'

class BookShelf extends React.Component {
  render() {
    const shelfBooks = this.props.externalData.filter(
      bookObj => bookObj.shelf === this.props.shelfKey
    )
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map(x => {
              return (
                <Book
                  key={x.id}
                  className="book"
                  bookInfo={x}
                  uponBookShelfChange={this.props.uponBookShelfChange}
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
