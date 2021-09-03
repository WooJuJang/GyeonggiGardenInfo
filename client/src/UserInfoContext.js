import React,{createContext,useReducer } from 'react';
import { getCookie, setCookie } from './Components/Auth/Cookis';



let initialState = {id:''};
const UserInfoContext = createContext(initialState);
const {Provider}=UserInfoContext

const StateProvider=({children})=>{
  let [state,dispatch]=useReducer((state,action)=>{
    console.log(state)
    switch(action.type){
      case 'INSERT_USER':
        setCookie('id',action.id,{
          path:"/",
        })
        return{
          id:action.id
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
