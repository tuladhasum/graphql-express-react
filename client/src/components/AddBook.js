import React, { Component } from 'react'
import { graphql } from 'react-apollo';

import {getAuthorsQuery} from '../queries/queries';

class AddBook extends Component {
  displayAuthors() {
    var data = this.props.data;

    if(data.loading){
      return (<option disabled>Loading Authors..</option>);
    }else{
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label htmlFor="bookname">Book name</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label htmlFor="genre">genre</label>
        <input type="text"/></div>

        <div className="field">
          <label htmlFor="author">Author</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);
