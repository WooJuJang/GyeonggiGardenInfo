import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, from} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import {  createHttpLink } from '@apollo/client';
import {CookiesProvider} from 'react-cookie';
import { getCookie } from './Components/Auth/Cookis';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {onError} from "apollo-link-error";
import { graphql } from 'graphql';


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie('accessToken')
  
  console.log("client token is "+token)
  // return the headers to the context so httpLink can read them
  //console.log(token)
  if(token===null){
   console.log('token null') 
   return null
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink=onError(({graphQLErrors,networkError})=>{
  if(graphQLErrors){
    console.log("graphQL Error: "+graphQLErrors)
    graphQLErrors.map(({message,locations,path})=>{
      console.log(message)
      console.log(locations)
      console.log(path)
    })
  }
    
  // graphQLErrors.forEach(({message,locations,path})=>
  //   console.log(`[GraphQL error]: Message: ${message},Location: ${locations}, Path: ${path}`,),
  //   );
    if(networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials:'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
  link:from([errorLink,authLink,httpLink])
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
