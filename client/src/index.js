import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient,ApolloLink} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error'
import { setContext } from "apollo-link-context";
import {  createHttpLink } from '@apollo/client';

import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  //uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
