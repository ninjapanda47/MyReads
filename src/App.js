import React from 'react'
import * as BooksAPI from './BooksAPI'
import Results from './Results'
import Search from './Search'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
     results: []
  }

ComponentDidMount() {
  BooksAPI.getAll().then((results) => {
    this.setState({results})
  })
}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Results
          results={this.state.results}
          />
        )}/>
       <Route path='/search' render={() => (
          <Search      
          />
        )}/>


      </div>
    )
  }
}

export default BooksApp
