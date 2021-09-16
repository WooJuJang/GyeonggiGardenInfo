import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import {Header} from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
import MyCalendar from './MyCalendar'
import { UserInfoContext } from '../../UserInfoContext'

const GardenCalendar=()=>{
    const history=useHistory();
    const {state}=useContext(UserInfoContext)
return(
    <div>
        <HeaderStyledContainer garden_calendar state={state.id}>
        <Header history={history}/>
        </HeaderStyledContainer>
        <div>
        <MyCalendar/>
        </div>
    </div>

)
}
export default GardenCalendar