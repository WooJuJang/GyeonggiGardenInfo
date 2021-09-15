import React ,{useContext} from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, from } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import { createHttpLink } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import { getCookie, removeCookie, setCookie } from './Components/Auth/Cookis';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { Observable } from 'apollo-link';
import { StateProvider } from './UserInfoContext';
import { UserInfoContext } from './UserInfoContext';

let accessToken;
const authLink = setContext((_, { headers }) => {
  const refreshToken=getCookie('refreshToken')
  console.log(accessToken)
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Access ${accessToken}` : refreshToken?`Refresh ${refreshToken}`:"",
    }
  }
});


const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError) {
    console.log("networkError!")
  }
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
       if (message === 'access token is expired') {
         console.log(message)
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
           temp_token=x.errors[0].message
           if(temp_token==='refresh token is expired'){
            window.location.replace("/tokenerror")
           }else if(temp_token==='access token is expired'){
           }else if(temp_token==='Invalid Token'){
            window.location.replace("/tokenerror")
           }
           else{
            accessToken=temp_token
            window.location.reload();
           }
          })
        }
       } else{
        accessToken=message
       }
    })
  }
})




const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    // typePolicies:{
    //   UserPlantInfo:{
    //     keyFields: ['user_crops'],
    //   },
    // }
  }),
  //link: authLink.concat(httpLink)
  link: from([authLink, errorLink, httpLink])

})


ReactDOM.render(
  <React.StrictMode>
          <StateProvider>
    <CookiesProvider>
      <ApolloProvider client={client}>

        <App />
      </ApolloProvider>
    </CookiesProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
