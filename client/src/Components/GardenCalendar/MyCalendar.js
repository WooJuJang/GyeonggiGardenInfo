import FullCalendar, { isPropsEqual } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import React, { useContext, useState } from 'react'
import { GardenCalendarStyledContainer } from '../../css/GardenCalendar/GardenCalendarStyledContainer';
import { useQuery } from '@apollo/client';
import {  FINDUSERPLANTINFO } from '../../Database/Graphql';
import { UserInfoContext } from '../../UserInfoContext';


const test='2021-08-16';

const holiday='대체공휴일';

const MyCalendar = () => {
    const {state}=useContext(UserInfoContext)
    const userPlantInfo=useQuery(FINDUSERPLANTINFO,{variables:{key:state.id}})

    //작물관리 변수
    const [plantlist,setPlantList]=useState('none');
    const [managementlist,setManagementList]=useState('none');
    const [harvestlist,setHarvestList]=useState('none');
    const [removelist,setRemoveList]=useState('none');

    console.log(userPlantInfo.data?.findUserPlantInfo.map((data)=>{
        console.log(data)
        console.log(data.user_crops,"심은 날: ",data.plant_date)
        console.log(data.user_crops,"수확 날: ",data.harvest_date)
        console.log(data.user_crops,"제거 날: ",data.remove_date)
    }))
    const [selectDate,setSelectDate]=useState('')
    const [day,setDay]=useState('')
    const handleDateClick=(arg)=>{
        setSelectDate(arg.dateStr.split('-')[2])
        const date=String(arg.date)
        setDay(date.split(' ')[0])
         
    }
    
    let eventarray=[];
    eventarray.push({title:'event23dddddddddddddddddddddddddddd',date:'2021-09-05'})
    eventarray.push({title:holiday,date:test,color:'red'})
   

    //작물관리창 display변경 함수
    const onHandlePlantList=(e)=>{
        if(e.target.value==='none'){
            setPlantList('block')
        }else{
            setPlantList('none')
        }
    }
    const onHandleManagementList=(e)=>{
        if(e.target.value==='none'){
            setManagementList('block')
        }else{
            setManagementList('none')
        }
    }
    const onHandleHarvestList=(e)=>{
        if(e.target.value==='none'){
            setHarvestList('block')
        }else{
            setHarvestList('none')
        }
    }
    const onHandleRemoveList=(e)=>{
        if(e.target.value==='none'){
            setRemoveList('block')
        }else{
            setRemoveList('none')
        }
    }

    return(
        <GardenCalendarStyledContainer>
        <div className='main-form'>
        <div className='todo-form'>
            <div className='todo'>
                {selectDate}
                <br/>
                {day}
                <br/>
                <div className='plant'>
                    작물심기
                    <button className='plant-add-btn' onClick={onHandlePlantList} value={plantlist}>+</button>
                </div>
                {plantlist==='none'
                ?
                <div className='plant-list'>
                </div>
                :<div className='plant-list'>
                    <input></input>
                    <button>추가</button>
                </div>}

                <div className='management'>
                    작물관리
                    <button className='management-add-btn' onClick={onHandleManagementList} value={managementlist}>+</button>
                </div>
                {
                   managementlist==='none'? 
                   <div className='management-list'>
                   </div>
                   :        
                <div className='management-list'>
                   <input type='radio'/><label>물 주기</label><br/>
                   <input type='radio'/><label>비료</label><br/>
                   <input type='radio'/><label>잡초 뽑기</label><br/>
                   <input type='radio'/><label>지주대</label><br/>
               </div>
                }

                <div className='harvest'>
                    작물수확
                    <button className='harvest-add-btn' onClick={onHandleHarvestList} value={harvestlist}>+</button>
                </div>
                {
                    harvestlist==='none'?
                    <div className='harvest-list'>
                    </div>
                    :
                    <div className='harvest-list'>
                    <input type='radio'/>
                    <input type='radio'/>
                </div>
                }

                <div className='remove'>
                    작물제거
                    <button className='remove-add-btn' onClick={onHandleRemoveList} value={removelist}>+</button>
                </div>
                {
                    removelist==='none'?
                    <div className='remove-list'>
                    </div>
                    :
                    <div className='remove-list'>
                    <input type='radio'/>
                    <input type='radio'/>
                </div>
                }

            </div>
        </div>
        <div className='calendar-form'>
        <FullCalendar
            plugins={[ dayGridPlugin,interactionPlugin ]}
                      //Dayclick open sweetalert
            eventClick={
                function(arg){
                    console.log(arg.event.title)
                } 
            }
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            events={

                
                   eventarray
                
            }
        />
        </div>

        </div>
    </GardenCalendarStyledContainer>
    )

    }
export default MyCalendar