import React from 'react'
import BookShelf from './BookShelf.js'

class BookShelfDisplayPage extends React.Component {
  state = { value: this.props.currentShelf }

  options = {
    move: { displayName: 'Move to...', disabled: true },
    currentlyReading: { displayName: 'Currently Reading', disabled: false },
    wantToRead: { displayName: 'Want to Read', disabled: false },
    read: { displayName: 'Read', disabled: false },
    none: { displayName: 'None', disabled: false },
  }

  render() {
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.values(this.props.shelves).map(x => {
              return (
                <BookShelf
                  key={x.shelfId}
                  className="a-bookshelf"
                  shelfName={x.displayName}
                  shelfBooks={x.books}
                  handleBookShelfChange={this.props.handleBookShelfChange}
                ></BookShelf>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelfDisplayPage
