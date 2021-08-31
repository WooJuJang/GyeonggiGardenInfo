import React, { useContext } from 'react'
import {getCookie,removeCookie} from '../Auth/Cookis'
import {LOGOUT} from "../../Database/Graphql"
import { useMutation } from '@apollo/client'
import UserInfoContext, { UserInfoConsumer } from '../../UserInfoContext'




const Header=({history})=>{
    const [logout]=useMutation(LOGOUT)
    const contextValue=useContext(UserInfoContext)
    const moveLogin=()=>{
        history.push("/signin")
    }

    const UserInfo=()=>{
        history.push("/userinfo")
    }
    const MoveGardenLocation=()=>{

        try{
            history.push("/gardenlocation")
        }catch(e){
            console.log(e)
        }
      
    }
    const MoveCropRecommend=()=>{

        try{
            history.push("/croprecommend")
        }catch(e){
            console.log(e)
        }
      
    }

    const Logout=()=>{
    
    
        removeCookie('accessToken')
        removeCookie('refreshToken')
       
       console.log(logout({variables:{id: contextValue.state.id}}))
        //window.location.replace("/")
       
    }


    return(
    <div className='header-form'>
        <div className='menu'>      
            <label onClick={MoveGardenLocation} className='MoveGardenLocation'>경기도 텃밭 위치&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label onClick={MoveCropRecommend} className='MoveCropRecommend'>텃밭 작물 추천&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveMyGarden'>내 텃밭 보기&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveGardenCalendar'>텃밭 달력</label>
        </div>
  
        {getCookie('accessToken')?
            <div className='btn'>
                <button onClick={UserInfo}>UserInfo</button>
                <button onClick={Logout}>Logout</button>
            </div>
    :<div className='btn'>
        <button onClick={moveLogin}>SignIn</button>
    </div>
    }
   
    </div>)
}
export default Header