import React, { useContext } from 'react'
import {getCookie,removeCookie} from '../Auth/Cookis'
import { LOGOUT} from "../../Database/Graphql"
import {useMutation} from '@apollo/react-hooks'
import {UserInfoContext } from '../../UserInfoContext'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'



export const Header=({history})=>{
    const {state,dispatch}=useContext(UserInfoContext);
    const [removeRefreshToken]=useMutation(LOGOUT,{variables:{id:state.id}})

    const logout=()=>{
        removeCookie('refreshToken')
        removeRefreshToken(LOGOUT,{variables:{id:state.id}})
        dispatch({type:'REMOVE_USER'})
        window.location.replace("/")
    }

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
    const MoveGardenCalendar=()=>{
        if(state.id){
            try{
                history.push("/gardencalendar")
            }catch(e){
                console.log(e)
            }
        }else{
            alert('로그인이 필요한 서비스입니다.');
        }
    }




    return(
    <div className='header-form'>
        
        <div className='menu'>      
            <label onClick={MoveGardenLocation} className='MoveGardenLocation'>경기도 텃밭 위치</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label onClick={MoveCropRecommend} className='MoveCropRecommend'>텃밭 작물 추천</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label className='MoveMyGarden'>내 텃밭 보기</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
            <label onClick={MoveGardenCalendar} className='MoveGardenCalendar'>텃밭 달력</label>
        </div>
  
        {getCookie('refreshToken')?
            <div className='btn'>
                <button onClick={UserInfo}>UserInfo</button>
                <button onClick={logout}>Logout</button>
            </div>
    :<div className='btn'>
        <label onClick={moveLogin}>SignIn</label>
    </div>
    }
  
    </div>)
}
