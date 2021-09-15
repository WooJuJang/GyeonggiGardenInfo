import React,{createContext,useReducer } from 'react';
import { getCookie, setCookie } from './Components/Auth/Cookis';



let initialState = {id:'',accessToken:''};
const UserInfoContext = createContext(initialState);
const {Provider}=UserInfoContext

const StateProvider=({children})=>{
  let [state,dispatch]=useReducer((state,action)=>{
   
    switch(action.type){
      case 'INSERT_USER':
        setCookie('id',action.id,{
          path:"/",
        })
        return{
          id:action.id
        }
      case 'REMOVE_USER':
        setCookie('id','',{
          path:"/",
        })
       
        return{
          id:''
        }
      default:
        throw new Error();

    };
  })
  if(!state){
    
    state={
      id:getCookie('id')}
  }
  return <Provider value={{state,dispatch}}>{children}</Provider>
}
export {UserInfoContext,StateProvider}
