import React from 'react'
import * as BooksAPI from './BooksAPI'
import Results from './Results'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    results: [],
    search: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((results) => {
      console.log(results)
      this.setState({ results })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ search: [] })
  }

  searchBooks = (query, maxResults, results) => {
    if (query === '') {
      this.setState({ search: [] })
    } else {
      BooksAPI.search(query, maxResults, this.state.results).then((search) => {
        for (let i = 0; i < this.state.results.length; i++) {
          for (let j = 0; j < search.length; j++) {
            if (this.state.results[i].id === search[j].id) {
              console.log('match')
              search[j] = this.state.results[i]
            }
            else {
              /*search[j].shelf = 'none'*/
            }          
          }
        }
        this.setState({ search })
      })
    }
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then((book) => {
      BooksAPI.getAll().then((results) => {
        this.setState({ results })
      })
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="results">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <Results results={this.state.results.filter((result) => (result.shelf) === 'currentlyReading')}
                        onUpdateBooks={(book, shelf) => {
                          this.updateBooks(book, shelf)
                        }} />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <Results results={this.state.results.filter((result) => (result.shelf) === 'wantToRead')}
                        onUpdateBooks={(book, shelf) => {
                          this.updateBooks(book, shelf)
                        }} />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <Results results={this.state.results.filter((result) => (result.shelf) === 'read')}
                        onUpdateBooks={(book, shelf) => {
                          this.updateBooks(book, shelf)
                        }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' className="open-search"> Add a book</Link>
              </div>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <Search
            bookSearch={this.searchBooks}
            results={this.state.search}
            onUpdateBooks={(book, shelf) => {
              this.updateBooks(book, shelf)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

