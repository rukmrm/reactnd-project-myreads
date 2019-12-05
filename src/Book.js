import React from 'react'
import BookShelfChanger from './BookShelfChanger.js'

class Book extends React.Component {
  state = {}

  render() {
    const thumbnail = this.props.bookInfo.imageLinks
      ? `url(${this.props.bookInfo.imageLinks.thumbnail})`
      : ''
    return (
      <li key={this.props.bookInfo.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: thumbnail
              }}
            />
            <BookShelfChanger
              currentShelf={this.props.bookInfo.shelf}
              uponBookShelfChange={this.props.uponBookShelfChange}
              bookObj={this.props.bookInfo}
            />
          </div>

          {this.props.bookInfo.title ? (
            <div className="book-title">{this.props.bookInfo.title}</div>
          ) : (
            ''
          )}

          {this.props.bookInfo.authors ? (
            <div className="book-authors">
              {this.props.bookInfo.authors.join(', ')}
            </div>
          ) : (
            ''
          )}
        </div>
      </li>
    )
  }
}

export default Book
