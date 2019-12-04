import React from 'react'

class BookShelfChanger extends React.Component {
  state = { value: this.props.currentShelf || 'none' }

  options = {
    move: { displayName: 'Move to...', disabled: true },
    currentlyReading: { displayName: 'Currently Reading', disabled: false },
    wantToRead: { displayName: 'Want to Read', disabled: false },
    read: { displayName: 'Read', disabled: false },
    none: { displayName: 'None', disabled: false }
  }

  // handleBookShelfChange = (bookObj, newShelf) => {
  handleBookShelfChange = event => {
    this.setState({ value: event.target.value })
    this.props.uponBookShelfChange(this.props.bookObj, this.state.value)
  }

  render() {
    return (
      <div key={this.props.bookObj.id} className="book-shelf-changer">
        {/* <select
          value={this.props.currentShelf || 'move'}
          onChange={e =>
            this.props.handleBookShelfChange(
              this.props.bookObj,
              e.target.value,
              this.state.value
            )
          }
        >
          {Object.entries(this.options).map((e, ei) => {
            return (
              <option
                key={ei}
                value={e[0]}
                disabled={e[1].disabled || e[0] === this.state.value}
              >
                {e[1].displayName}
              </option>
            )
          })}
        </select> */}

        <select value={this.state.value} onChange={this.handleBookShelfChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
