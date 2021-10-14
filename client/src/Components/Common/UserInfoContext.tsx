import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import { getCookie, setCookie } from '../Auth/Cookis';

let initialState = { id: '' };

//상태 컨텍스트
type State = {
  id: String;
}
const stateContext = createContext<State | undefined>(undefined)

//액션 컨텍스트
type Action =
  { type: 'INSERT_USER', id: String } | { type: 'REMOVE_USER' }

type IDispatch = Dispatch<Action>;
const dispatchContext = createContext<IDispatch | undefined>(undefined);


const reducer = (state: any, action: Action): State => {
  switch (action.type) {
    case 'INSERT_USER':
      setCookie('id', action.id, {
        path: "/"
      })
      return {
        id: action.id
      }
    case 'REMOVE_USER':
      setCookie('id', '', { path: "/" })
      return {
        id: ''
      }
    default:
      throw new Error();
  }
}

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  let [state, dispatch] = useReducer(reducer, initialState)
  //새로고침 시 컨텍스트 재정의
  if (state.id === '') {
    state = {
      id: getCookie('id')
    }
  }
  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        {children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  )
}

//상태컨텍스트 사용 함수
export const useStateContext = () => {
  const state = useContext(stateContext)
  if (!state) throw new Error("State Context not found")
  return state;
}
//디스패치컨텍스트 사용 함수
export const useDispatchContext = () => {
  const dispatch = useContext(dispatchContext)
  if (!dispatch) throw new Error("Dispatch Context not found")
  return dispatch
}

