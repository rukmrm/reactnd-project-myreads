import React from 'react'
import BookShelfChanger from './BookShelfChanger.js'

class Book extends React.Component {
  state = {}

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${this.props.bookInfo.imageLinks.thumbnail}")`,
            }}
          />
          <BookShelfChanger currentShelf={this.props.bookInfo.shelf} />
        </div>
        <div className="book-title">{this.props.bookInfo.title}</div>
        <div className="book-authors">{this.props.bookInfo.authors}</div>
      </div>
    )
  }
}

export default Book
