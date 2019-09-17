import React, { Component } from 'react'
import BookDetails from './BookDetails';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  handleChange(event) {
    console.log(event.target.value);
}

  render() {
    const { books, onUpdateBookShelf } = this.props

    //console.log(books)

    const CurrentlyReading = books.filter( book => book.shelf === "currentlyReading")
    const WantToRead = books.filter(book => book.shelf === "wantToRead")
    const Read = books.filter(book => book.shelf === "read")

  
    return (

        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {CurrentlyReading.map((book) => 
                                <BookDetails
                                key={book.id}
                                book={book}
                                onUpdateBookShelf={onUpdateBookShelf}/>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {WantToRead.map((book) => 
                                <BookDetails
                                key={book.id}
                                book={book}
                                onUpdateBookShelf={onUpdateBookShelf}/> )}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {Read.map((book) => 
                                <BookDetails
                                key={book.id}
                                book={book}
                                onUpdateBookShelf={onUpdateBookShelf}/>
                                 )}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search' >Add a book</Link>
            </div>
        </div>

    )
  }
}

export default ListBooks