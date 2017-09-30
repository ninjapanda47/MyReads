import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import Results from './Results'
import { Link } from 'react-router-dom'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class Search extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.props.bookSearch(query)
        console.log(query)
    }

    render() {

        const { query } = this.state
        const { results, onUpdateBooks } = this.props
        console.log(this.props)

        return (
            <div className="search">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search"> </Link>
                        <div className="search-books-input-wrapper">
                            <input type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)} />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <Results results={results}
                            onUpdateBooks={onUpdateBooks} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Search
