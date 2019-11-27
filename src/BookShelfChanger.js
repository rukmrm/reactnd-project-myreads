import React from 'react'

class BookShelfChanger extends React.Component {
  state = { value: this.props.currentShelf }

  options = {
    move: { displayName: 'Move to...', disabled: true },
    currentlyReading: { displayName: 'Currently Reading', disabled: false },
    wantToRead: { displayName: 'Want to Read', disabled: false },
    read: { displayName: 'Read', disabled: false },
    none: { displayName: 'None', disabled: false },
  }

  render() {
    return (
      <div key={this.props.bookObj.id} className="book-shelf-changer">
        <select
          value={this.props.currentShelf}
          onChange={e =>
            this.props.handleBookShelfChange(this.props.bookObj, e.target.value, this.state.value)
          }
        >
          {Object.entries(this.options).map((e, ei) => {
            return (
              <option key={ei} value={e[0]} disabled={e[1].disabled || e[0] === this.state.value}>
                {e[1].displayName}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
