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
import { Observable } from 'apollo-link';
import { logout } from './Components/Common/Header';

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
      authorization: token ? `Access ${token}` : "",
    }
  }
});

const errorLink=onError(({graphQLErrors,networkError,operation,forward})=>{
   if(graphQLErrors){
     graphQLErrors.map(({message,locations,path})=>{
       if(message==='token expired'){
         const refreshToken=getCookie('refreshToken')
         if(refreshToken){
           const headers=operation.getContext().headers
           operation.setContext({
             headers:{
               ...headers,
               authorization:refreshToken?`Refresh${refreshToken}`:"",
             }
           })
           const observable=new Observable(async(observer)=>{
             try{
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              return forward(operation).subscribe(subscriber);
             }catch(err){
               console.log(err)
             }

           })
           observable.subscribe((res)=>{
             if(res.errors){
               console.log(res.errors[0])
               if(res.errors[0].message==='refresh token is expired'){
                 console.log(res.errors.message)
                 logout();
               }
             }
           })
         }
       }
     })
   } 
})


   

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials:'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
  link:from([authLink,errorLink,httpLink])

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
