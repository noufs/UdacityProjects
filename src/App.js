import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import './App.css'
import { Route, BrowserRouter } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  
  changeBookShelf = (book, newShelf) => {
    book.shelf = newShelf;    
    this.setState((currentState) => ({
      books: currentState.books
        .filter(b => b.id !== book.id)
        .concat(book)
    }))
    BooksAPI.update(book,newShelf)
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
              onUpdateBookShelf={this.changeBookShelf}
            />
          )} />
          <Route path='/search' render={({ history }) => (
            <SearchBook 
            books={this.state.books}
            onUpdateBookShelf= {this.changeBookShelf}
            />
          )} />
        </div>
      </BrowserRouter>

    )
  }
}

export default BooksApp
