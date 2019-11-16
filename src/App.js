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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select>
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">To Kill a Mockingbird</div>
                        <div className="book-authors">Harper Lee</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>{' '}
              {/* end a shelf */}
            </div>
          </div>
        </div>{' '}
        {/* end shelves wrapper */}
      </div> /* end app */
    ) /* end return (within render) */
  } /* end render */
}

export default BooksApp
