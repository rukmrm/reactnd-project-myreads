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
      },
      wantToRead: {
        displayName: 'Want to Read',
        books: [],
      },
      read: {
        displayName: 'Read',
        books: [],
      },
    },
    getAllBooks: BooksAPI.getAll,
    // externalData: null,
  }

  componentDidMount() {
    this._asyncRequest = BooksAPI.getAll().then(externalData => {
      this._asyncRequest = null
      this.setState({ externalData })

      // Also set up arrays sorted by shelf/status
      // let shelvesState = {
      let shelves = {
        currentlyReading: {
          displayName: 'Currently Reading',
          books: [],
        },
        wantToRead: {
          displayName: 'Want to Read',
          books: [],
        },
        read: {
          displayName: 'Read',
          books: [],
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
              <BookShelf
                className="a-bookshelf"
                shelfName={this.state.shelves.currentlyReading.displayName}
                shelfBooks={this.state.shelves.currentlyReading.books}
              ></BookShelf>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
