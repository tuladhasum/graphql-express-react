import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List - Sumit</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
