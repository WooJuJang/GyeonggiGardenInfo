import React from 'react'
import { useHistory } from 'react-router'
import {Header} from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
import MyCalendar from './MyCalendar'

const GardenCalendar=()=>{
    const history=useHistory();
return(
    <div>
        <HeaderStyledContainer garden_calendar>
        <Header history={history}/>
        </HeaderStyledContainer>
        <div>
        <MyCalendar/>
        </div>
    </div>

)
}
export default GardenCalendar