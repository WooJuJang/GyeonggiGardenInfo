import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import {Header} from '../Common/Header'
import { HeaderStyledContainer } from '../../css/Common/HeaderStyledContainer'
import MyCalendar from './MyCalendar'
import { useStateContext } from '../Common/UserInfoContext'
//텃밭달력 부모컴포넌트
const GardenCalendar=()=>{
    const history=useHistory();
    const state=useStateContext();
return(
    <div>
        <HeaderStyledContainer garden_calendar state={state.id}>
        <Header/>
        </HeaderStyledContainer>
        <div>
        <MyCalendar/>
        </div>
    </div>

)
}
export default GardenCalendar