import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookSearchPage from './BookSearchPage.js'
import BookShelfDisplayPage from './BookShelfDisplayPage.js'
import './App.css'

/* 
  1. Can we track the books' shelf directly, without using the shelves var?
  2. BookshelfChanger:
    a. Set value from prop or state?
    b. onChange = (this.props.handleBookShelfChange)
      or this.handleBookShelfChange ?
      Can be and must be this.handleBookShelfChange:
      - Is only needed there
      - Must know have the bookinfo and the new shelf value
    c. handleBookShelfChange should take no params
      i. Implicit param (event), which has select's value: event.target.value
      ii. Should call another function uponBookShelfChange(bookObj, newShelf)
    d. uponBookShelfChange can/must be in App.js? Because it sets state? 
      Or can set app state from BookShelfChanger.js?
*/

const shelves = [
  { key: 'currentlyReading', displayName: 'Currently Reading' },
  { key: 'wantToRead', displayName: 'Want to Read' },
  { key: 'read', displayName: 'Read' }
]

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    getAllBooks: BooksAPI.getAll,
    externalData: []
  }

  uponBookShelfChange = (bookObj, newShelf) => {
    /* this._asyncRequest = BooksAPI.update(bookObj, newShelf).catch(err => {
      console.log(err)
      this.setState({ error: true })
    }) */
    BooksAPI.update(bookObj, newShelf)
    if (newShelf === 'none') {
      this.setState(prevState => ({
        externalData: prevState.externalData.filter(b => b.id !== bookObj.id)
      }))
    } else {
      bookObj.shelf = newShelf
      this.setState(prevState => ({
        externalData: prevState.externalData
          .filter(b => b.id !== bookObj.id)
          .concat(bookObj)
      }))
    }
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
      /* 
      shelves.currentlyReading.books = externalData.filter(
        x => x.shelf === 'currentlyReading'
      )
      shelves.wantToRead.books = externalData.filter(
        x => x.shelf === 'wantToRead'
      )
      shelves.read.books = externalData.filter(x => x.shelf === 'read')

      this.setState({ shelves })
      */
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearchPage
            handleShowSearchPage={this.handleShowSearchPage}
            handleSearch={this.handleSearch}
            uponBookShelfChange={this.uponBookShelfChange}
            searchResults={this.state.searchResults}
          />
        ) : (
          <div className="list-books">
            <BookShelfDisplayPage
              uponBookShelfChange={this.uponBookShelfChange}
              shelves={shelves}
              externalData={this.state.externalData}
            />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
