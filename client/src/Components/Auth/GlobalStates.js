import React,{useState,createContext} from 'react';

export const Authcontext=createContext();
export const AuthProvider=props=>{
    const[authState,setauthState]=useState({
        _id:'',
        id:'',
        city:''
    });
    return(
        <Authcontext.Provider value={[authState,setauthState]}>
            {props.children}
        </Authcontext.Provider>
    )
}