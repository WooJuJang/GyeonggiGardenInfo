import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios';
import FullCalendar, { isPropsEqual } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react'
import styled from "@emotion/styled"


const localizer = momentLocalizer(moment)
var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=DDQEBDDCmlvZEuTO2bZjjycsI3A%2Bb15YZAgKYj%2FNmFlju54lxuKi7LC2R7CIdY2U6%2F%2BvDblYu2AtmtxgLmNSRQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2015'); /* */
queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent('09'); /* */
var result=[];
axios.get(queryParams).then(res => {
    console.log(res.data);
    result=res;

}    )
const test='2021-08-16';
const tagtest='[data-date=\''+test+'\']{color:red;}';
export const StyleWrapper=styled.div`
    .fc-col-header-cell.fc-day.fc-day-sat{
        color:blue;
    }
    .fc-daygrid-day.fc-day.fc-day-sat{
        color:blue;
    }
    .fc-col-header-cell.fc-day.fc-day-sun{
        color:red;
    }
    .fc-daygrid-day.fc-day.fc-day-sun{
        color:red;
    }
    ${tagtest}
 
`

const holiday='대체공휴일';

const MyCalendar = () => {
    
    const handleDateClick=(arg)=>{
        console.log('aaaa')
         alert("aaaa");
    }

    return(

    
        <StyleWrapper date='2021-08-05' color='red'>
          
        <FullCalendar
            plugins={[ dayGridPlugin,interactionPlugin ]}
                      //Dayclick open sweetalert
            eventClick={
                function(arg){
                    alert(arg.event.title)
                }
            }
            initialView="dayGridMonth"
            events={
                [
                    {title:'event23dddddddddddddddddddddddddddd',date:'2021-08-03'},
                    {title:'event1dddddddddddddddddddddddddddd',date:'2021-08-05'},
                    {title:holiday,date:test,color:'red'}
                ]
            }
        />
       
    </StyleWrapper>
    )

    }
export default MyCalendar