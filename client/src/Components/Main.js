import React from 'react'
import Location from './Location'
import MyCalendar  from './MyCalendar'
import {Cookies} from 'react-cookie'
import {instanceOf} from 'prop-types'
import {getCookie,removeCookie} from './Auth/Cookis'
function Main({history}){
    const moveLogin=()=>{
        history.push("/signin")
    }
    const logout=()=>{
        removeCookie('token')
    }
    return(
        <div>
        <p>{`Bearer ${getCookie('token')}`}</p>
        <button onClick={moveLogin}>SignIn</button>
        <button onClick={logout}>Logout</button>
            <Location/>
            <MyCalendar/>
        </div>
    )
}

export default Main