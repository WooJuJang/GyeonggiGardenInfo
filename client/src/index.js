import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient,ApolloLink} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error'
import { setContext } from "apollo-link-context";
import {  createHttpLink } from '@apollo/client';
import {CookiesProvider} from 'react-cookie';
import { getCookie } from './Components/Auth/Cookis';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory'


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie('token')
  // return the headers to the context so httpLink can read them
  if(token===null){
    
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials:'same-origin'
});

const client = new ApolloClient({
  //uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <ApolloProvider client={client}>

      <App />
    </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
