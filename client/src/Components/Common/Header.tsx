import React, { useContext } from 'react'
import { getCookie, removeCookie } from '../Auth/Cookis'
import { LOGOUT } from "../../Database/Graphql"
import { useMutation } from '@apollo/react-hooks'
import { useStateContext,useDispatchContext } from './UserInfoContext'
import { useHistory } from 'react-router-dom'
import { TimerContext } from './TimerContext'

export const Header = () => {
    const history = useHistory();
    const state=useStateContext();
    const dispatch=useDispatchContext();
    const {timerdispatch}=useContext(TimerContext);

    const [removeRefreshToken] = useMutation(LOGOUT,{variables:{id:state.id}})

    const logout = () => {
        removeCookie('refreshToken')
        removeCookie('timer')
        removeRefreshToken()
        dispatch({ type: 'REMOVE_USER' })
        timerdispatch({type:'TIMER_RESET'})
       window.location.replace("/")
      
    }

    const moveLogin = () => {
        history.push("/signin")
    }
    const moveUserInfo = () => {
        history.push("/userinfo")
    }
    const moveGardenLocation = () => {
        history.push("/gardenlocation")
    }
    const moveCropRecommend = () => {
        history.push("/croprecommend")
    }
    const moveMyGarden = () => {
        if (state.id) {
            history.push("/mygarden")

        } else {
            alert('로그인이 필요한 서비스입니다.');
        }
    }
    const moveGardenCalendar = () => {
        if (state.id) {
            history.push("/gardencalendar")
        } else {
            alert('로그인이 필요한 서비스입니다.');
        }
    }

    return (
        <div className='header-form'>
            <div className='menu'>
                <label onClick={moveGardenLocation} className='MoveGardenLocation'>경기도 텃밭 위치</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                <label onClick={moveCropRecommend} className='MoveCropRecommend'>텃밭 작물 추천</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                <label onClick={moveMyGarden} className='MoveMyGarden'>내 텃밭 보기</label><label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                <label onClick={moveGardenCalendar} className='MoveGardenCalendar'>텃밭 달력</label>
            </div>

            {getCookie('refreshToken') ?
                <div className='btn'>
                    <button onClick={moveUserInfo} className="userinfo-btn">{
                        history.location.pathname === '/' ? <label>userinfo</label> :
                            <img src="images/userinfo.png" alt="userinfo" width="30px" height="30px" />
                    }
                    </button>
                    <button onClick={logout} className="logout-btn">
                        {
                            history.location.pathname === '/' ? <label>logout</label> :
                                <img src="images/logout.png" alt="userinfo" width="30px" height="30px" />
                        }
                    </button>
                </div>
                : <div className='btn'>
                    <label onClick={moveLogin}>SignIn</label>
                </div>
            }

        </div>)
}
