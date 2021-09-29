import React,{createContext,useContext,useState,useEffect, useReducer, useCallback} from 'react';
import { UserInfoContext } from '../../UserInfoContext';
import {useMutation} from '@apollo/react-hooks'

import { removeCookie } from '../Auth/Cookis';
import { LOGOUT } from '../../Database/Graphql';

const TimerContext=createContext();

const TimerProvider=({children})=>{
    const {state,dispatch}=useContext(UserInfoContext);
    const [removeRefreshToken]=useMutation(LOGOUT,{variables:{id:state.id}})
    const [value,setValue]=useState(10);
    const [isIncrease,setIsIncrease]=useState(false)

    const tick=useCallback(()=>{
        return setTimeout(()=>setValue(value-1),1000)
    },[value])
    const logout=useCallback(()=>{
        setIsIncrease(false)
        setValue(10)
      
        clearTimeout(tick)
        removeCookie('refreshToken')
       removeRefreshToken(LOGOUT,{variables:{id:state.id}})
        dispatch({type:'REMOVE_USER'})
        window.location.replace("/")

    },[dispatch,removeRefreshToken,state.id,tick])
    useEffect(()=>{
        if(!isIncrease) return undefined;
        if(value>0 && isIncrease)
            tick();
        if(value<=0){
            logout();
        }
        return ()=>clearTimeout(tick);
    },[value,isIncrease,tick,logout])

    let [timerstate,timerdispatch]=useReducer((state,action)=>{
        switch(action.type){
            case 'TIMER_START':
                setIsIncrease(true)
                setValue(10)
                break;
            case 'TIMER_RESET':
                logout();
                break;
            default:
                throw new Error();
        }
    })
    return<TimerContext.Provider value={{value,timerstate,timerdispatch}}>
            {children}
        </TimerContext.Provider>
}

export {TimerProvider,TimerContext}