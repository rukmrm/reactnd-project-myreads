import React from 'react'

class BookShelfChanger extends React.Component {
  state = { value: this.props.currentShelf || 'none' }

  handleBookShelfChange = event => {
    this.setState({ value: event.target.value })
    this.props.uponBookShelfChange(this.props.bookObj, event.target.value)
  }

  render() {
    return (
      <div key={this.props.bookObj.id} className="book-shelf-changer">
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
