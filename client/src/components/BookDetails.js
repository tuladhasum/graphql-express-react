import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery} from '../queries/queries';

export class BookDetails extends Component {
  
  displayBookDetails() {
    console.log("displayBookDetails: ", this.props);
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            {
              book.author.books.map(item => {
                return <li key={item.id}>{item.name}</li>
              })
            }
          </ul>
        </div>
      )
    } else {
      return (
        <div>No book selected</div>
      )
    }
  }


  render() {  
    console.log(this.props);
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
