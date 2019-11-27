import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookSearchPage from './BookSearchPage.js'
import BookShelfDisplayPage from './BookShelfDisplayPage.js'
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
  }

  handleBookShelfChange = (bookObj, newShelf) => {
    // console.log('a, b', bookId, newShelf)
    let prevStateExternalData = this.state.externalData
    prevStateExternalData.forEach(x => {
      if (x.id === bookObj.id) x.shelf = newShelf
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

    this.setState({ shelves })

    this._asyncRequest = BooksAPI.update(bookObj, newShelf)
  }

  handleShowSearchPage = () => {
    this.setState({ showSearchPage: false })
  }

  handleSearch = query => {
    this._asyncRequest = BooksAPI.search(query)
      .then(searchResults => {
        this._asyncRequest = null
        if (!searchResults.error) {
          this.setState({ searchResults: searchResults || [] })
        } else {
          console.log('searchResults.error:', searchResults.error)
          this.setState({ searchResults: [] })
        }

        this.setState({ searchQuery: query })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this._asyncRequest = BooksAPI.getAll().then(externalData => {
      this._asyncRequest = null
      this.setState({ externalData })

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

      this.setState({ shelves })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearchPage
            handleShowSearchPage={this.handleShowSearchPage}
            handleSearch={this.handleSearch}
            handleBookShelfChange={this.handleBookShelfChange}
            searchResults={this.state.searchResults}
          />
        ) : (
          <div className="list-books">
            <BookShelfDisplayPage
              handleBookShelfChange={this.handleBookShelfChange}
              shelves={this.state.shelves}
            />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
