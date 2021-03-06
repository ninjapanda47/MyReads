import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class Results extends Component {

  updateBooks = (book, shelf) => {
    this.props.onUpdateBooks(book, shelf)
  }

  render() {

    const { results } = this.props

    return (
      <ol className="books-grid">
        {results.map((result) => (
          <li key={result.id} >
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks && result.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={result.shelf} onChange={(event) => this.updateBooks(result, event.target.value)}>
                  <option disabled >Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{result.title}</div>
            <div className="book-authors">{result.authors}</div>
          </li>
        ))}
      </ol>
    )
  }
}

export default Results
