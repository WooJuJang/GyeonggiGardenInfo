// import React,{createContext,useReducer } from 'react';
// import { getCookie, setCookie } from '../Auth/Cookis';

// let initialState = {id:''};
// const UserInfoContext = createContext(initialState);
// const {Provider}=UserInfoContext

// type Action={type:'INSERT_USER';id:String}|{type:'REMOVE_USER';id:String};

// const StateProvider=({children}:{children:any})=>{
//   let {state:String,dispatch:Action}=(state:String,action:Action):String=>
//   {
   
//     switch(action.type){
//       case 'INSERT_USER':
//         setCookie('id',action.id,{
//           path:"/",
//         })
//         return{
//           id:action.id
//         }
//       case 'REMOVE_USER':
//         setCookie('id','',{
//           path:"/",
//         })

//         return{
//           id:''
//         }
//       default:
//         throw new Error();

//     };
//   })
//   if(!state){
    
//     state={
//       id:getCookie('id')}
//   }
//   return <Provider value={{state,dispatch}}>{children}</Provider>
// }
// export {UserInfoContext,StateProvider}

import React,{createContext,useReducer,Dispatch,useContext } from 'react';
import { getCookie, setCookie } from '../Auth/Cookis';

let initialState = {id:''};

//const {Provider}=UserInfoContext
type State={
  id:String;
}
const stateContext=createContext<State | undefined>(undefined)

type Action=
  {type:'INSERT_USER',id:String}|{type:'REMOVE_USER'}

type IDispatch=Dispatch<Action>;
const dispatchContext = createContext<IDispatch|undefined>(undefined);


const reducer=(state:any,action:Action):State=>{

  console.log(action)
  switch(action.type){
    case 'INSERT_USER':
      setCookie('id',action.id,{
        path:"/"
      })
      return {
        id:action.id
      }
    case 'REMOVE_USER':
      setCookie('id','',{path:"/"})
      return{
        id:''
      }
    default:
      throw new Error();
  }
}

export const StateProvider=({children}:{children:React.ReactNode})=>{
  let [state,dispatch]=useReducer(reducer,initialState)
  if(state.id===''){
    state={
      id:getCookie('id')}
  }
  return(
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        {children}
      </stateContext.Provider>  
    </dispatchContext.Provider>
  )
}
export const useStateContext=()=>{
  const state=useContext(stateContext)
  if(!state) throw new Error("State Context not found")
  return state;
}

export const useDispatchContext=()=>{
  const dispatch=useContext(dispatchContext)
  if(!dispatch) throw new Error("Dispatch Context not found")
  return dispatch
}
// const StateProvider=({children}:{children:React.ReactNode})=>{
//   const [state,dispatch]=useReducer((state:any,action:Action):State=>{
   
//     switch(action.type){
//       case 'INSERT_USER':
//         setCookie('id',action.id,{
//           path:"/",
//         })
//         return{
//           id:action.id
//         }
//       case 'REMOVE_USER':
//         setCookie('id','',{
//           path:"/",
//         })
       
//         return{
//           id:''
//         }
//       default:
//         throw new Error();

//     };
//   })
//   if(!state){
//     state={
//       id:getCookie('id')}
//   }
//   return <Provider value={{state,dispatch}}>{children}</Provider>


// }
