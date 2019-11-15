import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelves: [
      { name: 'Currently Reading', books: []},
      { name: 'Want to Read', books: []},
      { name: 'Read', books: []},
    ],
    getAllBooks: BooksAPI.getAll,
    // externalData: null,
  }

  componentDidMount() {
    this._asyncRequest = BooksAPI.getAll().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }


  render() {
    return (

      <div className="app">
        { console.log(this.state.externalData) }

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
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
                </div> {/* end a shelf */}
              </div>
            </div>

          </div> {/* end shelves wrapper */}
      </div> /* end app */
    ) /* end return (within render) */
  } /* end render */

}

export default BooksApp
