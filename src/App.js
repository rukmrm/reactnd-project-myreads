import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearchPage from './BookSearchPage.js'
import BookShelfDisplayPage from './BookShelfDisplayPage.js'
import './App.css'

/* 
  BookshelfChanger:
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
    getAllBooks: BooksAPI.getAll,
    externalData: []
  }

  uponBookShelfChange = (bookObj, newShelf) => {
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

  handleCloseSearchPage = () => {
    this.setState({ searchQuery: '' })
    this.setState({ searchResults: [] })
  }

  handleSearch = query => {
    if (query.length > 0) {
      this._asyncRequest = BooksAPI.search(query)
        .then(searchResults => {
          this._asyncRequest = null
          if (!searchResults.error) {
            // merge any shelf info
            searchResults = searchResults.map(searchBook => {
              this.state.externalData.map(x => {
                if (searchBook.id === x.id) {
                  searchBook.shelf = x.shelf
                }
              })
              return searchBook
            })
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
    } else {
      this.setState({ searchResults: [] })
    }
  }

  componentDidMount() {
    this._asyncRequest = BooksAPI.getAll().then(externalData => {
      this._asyncRequest = null
      this.setState({ externalData })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search">
          <BookSearchPage
            handleCloseSearchPage={this.handleCloseSearchPage}
            handleSearch={this.handleSearch}
            uponBookShelfChange={this.uponBookShelfChange}
            searchResults={this.state.searchResults}
          />
        </Route>
        <Route exact path="/">
          <div className="list-books">
            <BookShelfDisplayPage
              uponBookShelfChange={this.uponBookShelfChange}
              shelves={shelves}
              externalData={this.state.externalData}
            />
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp
