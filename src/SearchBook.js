import React, { Component } from 'react'
import BookDetails from './BookDetails';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBook extends Component {

    state = {
        query: '',
        showingBooks: [],
        emptyResult: false
      }

    
    updateQuery = event => {
        const query = event.target.value;
        this.setState({ query });
    
        if(query)
        {
            BooksAPI.search(query.trim())
            .then(books => { 
                books.length > 0 ? this.setState({ showingBooks: books.filter((book) => 
                    book.imageLinks !== undefined && book.title !== undefined), emptyResult : false }) : this.setState({ showingBooks: [], emptyResult: true })
            })
            
            
        } 
        else 
        {
            this.setState({ showingBooks: [], emptyResult: false })
        }
      };


    render() {
        const { books, onUpdateBookShelf } = this.props
        const { showingBooks, query } = this.state

        const allBooks = showingBooks.filter((book) => { return books.filter(b => book.id === b.id ? book.shelf = b.shelf : book) })

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={this.updateQuery} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.emptyResult ? (<h1>No results found</h1>) : (allBooks.map((book) => (
                    <BookDetails
                              key={book.id}
                              book={book}
                              onUpdateBookShelf={onUpdateBookShelf}/>
                    )))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook