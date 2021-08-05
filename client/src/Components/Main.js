import React from 'react'
import Location from './Location'
import MyCalendar  from './MyCalendar'
function Main({history}){
    const moveLogin=()=>{
        history.push("/signin")
    }

    return(
        <div>
        <button onClick={moveLogin}>SignIn</button>
       
            <Location/>
            <MyCalendar/>
        </div>
    )
}

export default Main