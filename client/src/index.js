import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, from } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import { createHttpLink } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import { getCookie, setCookie } from './Components/Auth/Cookis';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { Observable } from 'apollo-link';
import Header from './Components/Common/Header';

const authLink = setContext((_, { headers }) => {

  const accessToken=getCookie('accessToken')
  if (accessToken === null) {
    console.log('token null')
    return null
  }
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Access ${accessToken}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {

  console.log("ERROR")
  console.log("before forward: "+getCookie('accessToken'))
  if (networkError) {
    console.log("networkError!")
  }
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(message)
      if (message === 'access token is expired') {
        console.log("access token is expired")
        const refreshToken = getCookie('refreshToken')
        
        if (refreshToken) {
          
          const headers = operation.getContext().headers
         
          operation.setContext({
            headers: {
              ...headers,
              authorization: refreshToken ? `Refresh ${refreshToken}` : "",
            }
          })
          
          const refreshObservable = new Observable(async (observer) => {
            console.log(operation.getContext().headers)
            try {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              
              return forward(operation).subscribe(subscriber)
              
            } catch (err) {
              console.log(err)
            }

          })

          var temp_token='';
          refreshObservable.subscribe(x => {
            console.log(x)
           temp_token=x.errors[0].message
           if(temp_token==='refresh token is expired'){
              Header.Logout();
           }else if(temp_token==='access token is expired'){

           }else if(temp_token==='Invalid Token'){
             alert("Invalid Token")
             Header.Logout();
           }else{
            setCookie('accessToken',temp_token,{path:"/",})
            window.location.reload();
           }
           
          
          })
        }
      } else if(message === 'UserInfo Undefinded' ){
        Header.Logout();
      }


    })
  }
})




const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
  link: from([authLink, errorLink, httpLink])

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
