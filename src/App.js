import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    shelves: {
      currentlyReading: {
        displayName: 'Currently Reading',
        books: [],
        shelfId: 0,
      },
      wantToRead: {
        displayName: 'Want to Read',
        books: [],
        shelfId: 1,
      },
      read: {
        displayName: 'Read',
        books: [],
        shelfId: 2,
      },
    },
    getAllBooks: BooksAPI.getAll,
    // externalData: null,
  }

  handleBookShelfChange = (bookId, newShelf) => {
    console.log('a, b', bookId, newShelf)
    let prevStateExternalData = this.state.externalData
    prevStateExternalData.forEach(x => {
      if (x.id === bookId) x.shelf = newShelf
    })
    console.log('prevStateExternalData', prevStateExternalData)

    this.setState({ externalData: prevStateExternalData })
    let shelves = {
      currentlyReading: {
        displayName: 'Currently Reading',
        books: [],
        shelfId: 0,
      },
      wantToRead: {
        displayName: 'Want to Read',
        books: [],
        shelfId: 1,
      },
      read: {
        displayName: 'Read',
        books: [],
        shelfId: 2,
      },
    }

    shelves.currentlyReading.books = this.state.externalData.filter(
      x => x.shelf === 'currentlyReading'
    )
    shelves.wantToRead.books = this.state.externalData.filter(x => x.shelf === 'wantToRead')
    shelves.read.books = this.state.externalData.filter(x => x.shelf === 'read')

    // this.setState({ shelves, shelvesState })
    this.setState({ shelves })
  }

  componentDidMount() {
    this._asyncRequest = BooksAPI.getAll().then(externalData => {
      this._asyncRequest = null
      this.setState({ externalData })

      // Also set up arrays sorted by shelf/status
      // TODO - merge with previous
      let shelves = {
        currentlyReading: {
          displayName: 'Currently Reading',
          books: [],
          shelfId: 0,
        },
        wantToRead: {
          displayName: 'Want to Read',
          books: [],
          shelfId: 1,
        },
        read: {
          displayName: 'Read',
          books: [],
          shelfId: 2,
        },
      }

      shelves.currentlyReading.books = externalData.filter(x => x.shelf === 'currentlyReading')
      shelves.wantToRead.books = externalData.filter(x => x.shelf === 'wantToRead')
      shelves.read.books = externalData.filter(x => x.shelf === 'read')

      // this.setState({ shelves, shelvesState })
      this.setState({ shelves })
    })
  }

  render() {
    return (
      <div className="app">
        {console.log(this.state.externalData)}
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.values(this.state.shelves).map(x => {
                return (
                  <BookShelf
                    key={x.shelfId}
                    className="a-bookshelf"
                    shelfName={x.displayName}
                    shelfBooks={x.books}
                    handleBookShelfChange={this.handleBookShelfChange}
                  ></BookShelf>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
