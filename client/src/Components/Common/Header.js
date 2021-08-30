import React from 'react'
import {getCookie,removeCookie} from '../Auth/Cookis'

export const logout=()=>{
    removeCookie('accessToken')
    removeCookie('refreshToken')
    window.location.replace("/")
   
}
const Header=({history})=>{
    
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
                <button onClick={logout}>Logout</button>
            </div>
    :<div className='btn'>
        <button onClick={moveLogin}>SignIn</button>
    </div>
    }
    </div>)
}
export default Header