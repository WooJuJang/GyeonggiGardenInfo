import React from 'react'
import {getCookie,removeCookie} from './Auth/Cookis'
const Header=({history})=>{
    let fontvar=''
    const moveLogin=()=>{
        history.push("/signin")
    }
    const logout=()=>{
        removeCookie('token')
        history.push('/')
       
    }
    const UserInfo=()=>{
        history.push("/userinfo")
    }
    const MoveGardenLocation=()=>{

        try{
            history.push("/gardenlocation")
            fontvar='bold'
            console.log(fontvar)
        }catch(e){
            
        }
      
    }
   
    return(
    <div className='header-form'>
        <div className='menu'>      
            <label onClick={MoveGardenLocation} className='MoveGardenLocation'>경기도 텃밭 위치&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveCropRecommend'>텃밭 작물 추천&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveMyGarden'>내 텃밭 보기&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveGardenCalendar'>텃밭 달력</label>
        </div>
        {getCookie('token')?
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