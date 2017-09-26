import React from 'react'
import * as BooksAPI from './BooksAPI'
import Results from './Results'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((results) => {
      this.setState({ results })
    })
  }

  searchBooks(query, maxResults) {
    BooksAPI.search(query, maxResults).then((results)=>{
      console.log(results)
      this.setState({ results })
    })
  }



  render() {
    let query = ''

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
                    <Results results={this.state.results.filter((result) => (result.shelf) == 'currentlyReading')}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <Results results={this.state.results.filter((result) => (result.shelf) == 'wantToRead')}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <Results results={this.state.results.filter((result) => (result.shelf) == 'read')}/>
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
          results = {this.searchBooks}
          />
        )} />


      </div>
    )
  }
}

export default BooksApp
