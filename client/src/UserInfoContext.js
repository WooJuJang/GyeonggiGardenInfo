import React,{createContext,useState} from 'react';

export const UserInfoContext=createContext({
    state:{id:'jangwoojoo'},
    actions:{
      setUserInfo:()=>{},
    }
  })
  const UserInfoProvider=({children})=>{
    const[id,setUserInfo]=useState("jangwoojoo")
    const value={
        state:{id},
        actions:{setUserInfo}
    }
  
  return(
      <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>
  )
  };

  const {Consumer:UserInfoConsumer}=UserInfoContext
  export {UserInfoProvider,UserInfoConsumer}
  export default UserInfoContext