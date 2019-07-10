const graphql = require('graphql');
const _ = require('lodash');
const dotenv = require('dotenv').config();

const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// // Dummy Data
// var books = [
//   {name: 'Harry Potter', genre: 'Fantasy', id: '1', authorId: '1'},
//   {name: 'Harry Potter 2', genre: 'Sci-Fi', id: '2', authorId: '2'},
//   {name: 'Harry Potter 3', genre: 'Fantasy', id: '3', authorId: '2'},
//   {name: 'Twilight Zone 1', genre: 'Fantasy', id: '4', authorId: '3'},
//   {name: 'Twilight Zone 2', genre: 'Science', id: '4', authorId: '2'},
//   {name: 'Twilight Zone 3', genre: 'Fantasy', id: '4', authorId: '1'},
//   {name: 'Twilight Zone 4', genre: 'Fantasy', id: '4', authorId: '3'},
// ];

// var authors = [
//   {name: 'J.L Rowling', age:44, id:'1'},
//   {name: 'Tom Dick', age:34, id:'2'},
//   {name: 'Tommy Hilfiger', age:45, id:'3'},
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent,args){
        return Author.findById(parent.authorId);
        // console.log(parent);
        // return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({
          authorId: parent.id
        });
        // return _.filter(books, {authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return Book.findById(args.id);
        // args.id
        // code to get data from db/ other source
        // return _.find(books,{id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return Author.findById(args.id);
        // return _.find(authors,{id: args.id})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({});
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
        // return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type:GraphQLString},
        age: {type:GraphQLInt}
      },
      resolve(parent,args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID}
      },
      resolve(parent,args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});