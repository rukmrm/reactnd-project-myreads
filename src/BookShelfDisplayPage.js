import React from 'react'
import BookShelf from './BookShelf.js'

class BookShelfDisplayPage extends React.Component {
  render() {
    const externalData = this.props.externalData
    const uponBookShelfChange = this.props.uponBookShelfChange
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelves.map(shelf => {
              return (
                <BookShelf
                  shelfKey={shelf.key}
                  className="a-bookshelf"
                  shelfName={shelf.displayName}
                  externalData={externalData}
                  uponBookShelfChange={uponBookShelfChange}
                ></BookShelf>
              )
            })}
            })
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelfDisplayPage
