import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import React, { useContext, useEffect, useState } from 'react'
import { GardenCalendarStyledContainer } from '../../css/GardenCalendar/GardenCalendarStyledContainer';
import { useMutation, useQuery } from '@apollo/client';
import {  FINDUSERPLANTINFO,INSERTUSERCROPS,INSERTHARVESTDATE,INSERTREMOVEDATE,FINDMANAGEINFO ,INSERTMANAGEDATE,FINDHOLIDAY} from '../../Database/Graphql';
import { UserInfoContext } from '../../UserInfoContext';



const MyCalendar = () => {
    const {state}=useContext(UserInfoContext)
    const today=new Date();
    const userPlantInfo=useQuery(FINDUSERPLANTINFO,{variables:{id:state.id}})
    const userManageInfo=useQuery(FINDMANAGEINFO,{variables:{id:state.id}},{fetchPolicy:'network-only'})

    const daylist={
        Mon:'Monday',
        Tue:'Tuesday',
        Wed:'Wednesday',
        Thu:'Thursday',
        Fri:'Friday',
        Sat:'Saturday',
        Sun:'Sunday',
    }

    //작물관리 창 변수
    const [plantlist,setPlantList]=useState('none');
    const [managementlist,setManagementList]=useState('none');
    const [harvestlist,setHarvestList]=useState('none');
    const [removelist,setRemoveList]=useState('none');

    //사용자 작물관리 정보 변수
    const [plant_content_list,setPlantContentList]=useState([]);
    const [managemen_content_list,setManagementContentList]=useState([]);
    const [harvest_content_list,setHarvestContentList]=useState([]);
    const [remove_content_list,setRemoveContentList]=useState([]);
    const [harvestable_crops_array,setHarvestableCropsArray]=useState([]);
    let eventarray=[];
    
    const manage_list={
        fertilizer:"비료 주기",
        watering:"물 주기",
        weed:"잡초 뽑기",
        fixture_install:"지주대 설치"
    }
   //공휴일
   const findHoliday=useQuery(FINDHOLIDAY,{variables:{year:String(today.getFullYear())}})
   let  holiday=[];
  
    //사용자 작물관리 정보 출력
  const [organize_eventarray,setOrganizeEventarray]=useState([]);
  const plantManageInfo=()=>{
    setHarvestableCropsArray([])
    holiday?.map((data)=>{
       return setOrganizeEventarray((organize_eventarray)=>[...organize_eventarray,data])
    })

    userPlantInfo.data?.findUserPlantInfo.map((data)=>{
        if(data.plant_date){
            data.plant_date.map((plant_day)=>{
                return eventarray.push({title:data.user_crops+'심기',date:plant_day})
            })
        }
        if(data.harvest_date){
            data.harvest_date.map((harvest_day)=>{
                return eventarray.push({title:data.user_crops+'수확',date:harvest_day})    
            })
        }
        if(data.remove_date){
            data.remove_date.map((remove_day)=>{
                return eventarray.push({title:data.user_crops+'제거',date:remove_day})    
            })
        }
        if(!data.remove_date[0]){
            return setHarvestableCropsArray((harvestable_crops_array)=>[...harvestable_crops_array,data.user_crops])
        }
        return false
    })

    const usermanageinfo=userManageInfo.data?.findUserManageInfo
    if(usermanageinfo){
        for(let prop in usermanageinfo){
            if(prop!=='__typename'){
                if(usermanageinfo[prop]){
                    usermanageinfo[prop].map((day)=>{
                        return eventarray.push({title:manage_list[prop],date:day})
                    })
                }
                
            }
        } 
    }

    //사용자 작물관리 정보 중복삭제 및 같은 날짜로 작업 묶기 
        eventarray?.map((data)=>{
           
            let titlearray=[];
            eventarray.map((a)=>{
                if(a.date===data.date){
                    
                    titlearray.push(a.title)
                    
                }
                return titlearray
            })
            
            return setOrganizeEventarray((organize_eventarray)=>[...organize_eventarray,{title:titlearray,date:data.date,color:'green'}])
        })
       
            setOrganizeEventarray((organize_eventarray)=>[...new Set(organize_eventarray.map(JSON.stringify))].map(JSON.parse))

        return organize_eventarray
  }

useEffect(()=>{
    setOrganizeEventarray([])
    if(findHoliday.loading===false && findHoliday?.data){
        findHoliday.data.findHoliday.map((data)=>{
            let date=String(data.locdate)
            return holiday.push({title:[data.dateName],date:date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2),color:'red'})
        })
        plantManageInfo();
    }
},[userPlantInfo,userManageInfo,findHoliday])

    //날짜 클릭 이벤트
    const [selectDate,setSelectDate]=useState(today.getDate())
    const [select_full_date,setSelectFullDate]=useState('')
    const [day,setDay]=useState(daylist[String(today).split(' ')[0]])

    const handleDateClick=(dateStr,fulldate)=>{
        setPlantList('none')
        setManagementList('none')
        setHarvestList('none')
        setRemoveList('none')
        
        setSelectFullDate(dateStr)
        setSelectDate(dateStr.split('-')[2])
        setDay(daylist[String(fulldate).split(' ')[0]])
        formatEventArray(dateStr);
    }
    const reset=()=>{
        setPlantContentList('')
        setHarvestContentList('')
        setRemoveContentList('')
        setManagementContentList('')
        setCheckboxStatus([])
    }

    const formatEventArray=(dateStr)=>{
        reset();
        
        const events=organize_eventarray.filter((data)=>{
            if(data.date.includes(dateStr)){
                return data
            }else{
                return false
            }
            
        })
        events.map((event_data)=>{
            if(event_data?.color==='green'){
                event_data?.title.map((data)=>{
                    const work=data.substr(data.length-2,2);
                    if(work==='심기'){
                        setPlantContentList((plant_content_list)=>[...plant_content_list,data])
                    }else if(work==='수확'){
                        setHarvestContentList((harvest_content_list)=>[...harvest_content_list,data])
                    }else if(work==='제거'){
                        setRemoveContentList((remove_content_list)=>[...remove_content_list,data])
                    }else{
                        setManagementContentList((managemen_content_list)=>[...managemen_content_list,data])
                    }
                    return false
                })
            }
            return false
        })


    }
    //작물관리창 display변경 함수
    const onHandlePlantList=(e)=>{
        if(e.target.value==='none'){
            setPlantList('block')
            setManagementList('none')
            setHarvestList('none')
            setRemoveList('none')
        }else{
            setPlantList('none')

        }
    }
    const onHandleManagementList=(e)=>{
        if(e.target.value==='none'){
            setPlantList('none')
            setManagementList('block')
            setHarvestList('none')
            setRemoveList('none')
        }else{
            setManagementList('none')

        }
    }
    const onHandleHarvestList=(e)=>{
        setPlantInputStatus('')
        if(e.target.value==='none'){
            setPlantList('none')
            setManagementList('none')
            setHarvestList('block')
            setRemoveList('none')
        }else{
            setHarvestList('none')
        }
    }
    const onHandleRemoveList=(e)=>{
        setPlantInputStatus('')
        if(e.target.value==='none'){
            setPlantList('none')
            setManagementList('none')
            setHarvestList('none')
            setRemoveList('block')
        }else{
            setRemoveList('none')
        }
    }

    //작물작업 추가
    const [input_plant,setInputPlant]=useState('')
    const [plant_input_status,setPlantInputStatus]=useState('')
    const [checkbox_status,setCheckboxStatus]=useState([])
    const [insertUserCrops]=useMutation(INSERTUSERCROPS,
        {refetchQueries:[
            {
                query:FINDUSERPLANTINFO,
                variables:{id:state.id}
            }
        ],awaitRefetchQueries:true
        ,onCompleted:(data)=>formatEventArray(select_full_date),
        }
        
        )
    const [insertHarvestDate]=useMutation(INSERTHARVESTDATE,
        {refetchQueries:[
            {
                query:FINDUSERPLANTINFO,
                variables:{id:state.id}
            }
        ],awaitRefetchQueries:true
        ,onCompleted:(data)=>formatEventArray(select_full_date),
        }
        )
    const [insertRemoveDate]=useMutation(INSERTREMOVEDATE,
        {refetchQueries:[
            {
                query:FINDUSERPLANTINFO,
                variables:{id:state.id}
            }
        ],awaitRefetchQueries:true
        ,onCompleted:(data)=>formatEventArray(select_full_date),
        }
        )
    const [insertManageDate]=useMutation(INSERTMANAGEDATE,{
        refetchQueries:[
            {query:FINDMANAGEINFO,
            variables:{id:state.id}}
        ],
        awaitRefetchQueries:true
        ,onCompleted:(data)=>formatEventArray(select_full_date),
    })
    const onChangePlant=(e)=>{
        setInputPlant(e.target.value)
    }
    const onClickPlant=()=>{
        
        insertUserCrops({variables:{id:state.id,user_crops:input_plant,plant_date:select_full_date}})
        setInputPlant('')
    }
    const onClickHarvest=()=>{
        
        insertHarvestDate({variables:{id:state.id,user_crops:plant_input_status,harvest_date:select_full_date}})
    }
    const onClickRemove=()=>{
    
        insertRemoveDate({variables:{id:state.id,user_crops:plant_input_status,remove_date:select_full_date}})
    }
    const onHandleClickRadioButton=(radioBtnName)=>{
        setPlantInputStatus(radioBtnName)
    }
    const onHandleCheckBox=(id,checked)=>{
        if(checked){
            setCheckboxStatus([...checkbox_status,id])
        }else{
            setCheckboxStatus(checkbox_status.filter(data=>data!==id))
        }
    }
   const onClickManageDateSave=()=>{
    let select_full_date_list={
        fertilizer:"",
        watering:"",
        weed:"",
        fixture_install:""
    }
    for(let data in checkbox_status){
        select_full_date_list[checkbox_status[data]]=select_full_date
    }
    insertManageDate({variables:{id:state.id,fertilizer:select_full_date_list['fertilizer'],watering:select_full_date_list['watering'],weed:select_full_date_list['weed'],fixture_install:select_full_date_list['fixture_install']}})
   }

    return(
        <GardenCalendarStyledContainer plantlist={plantlist} managementlist={managementlist} harvestlist={harvestlist} removelist={removelist}>
        <div className='main-form'>
        <div className='todo-form'>
            <div className='todo'>
                <label className="todo-date">{selectDate}</label>
                <label className="todo-day">{day}</label>
                <br/>
                <div className='plant'>
                    <label className='plant-label' >작물심기</label>
                    <button className='plant-add-btn' onClick={onHandlePlantList} value={plantlist}>+</button>
                </div>
                {plantlist==='none'
                ?
                <div className='plant-list'>
                    <div className='detail-list'>
                    {
                        Array.from(plant_content_list).map((data,index)=>{
                            return <li key={index}>{data}</li>
                        })
                    }
                    </div>
                </div>
                :<div className='plant-list'>
                   
                    <input value={input_plant} onChange={onChangePlant} className='plant-input' required></input>
                    <button onClick={onClickPlant} className='plant-input-add-btn'>Add</button>
                 
                </div>}

                <div className='management'>
                    <label className='management-label'>작물관리</label>
                    <button className='management-add-btn' onClick={onHandleManagementList} value={managementlist}>+</button>
                </div>
                {
                   managementlist==='none'? 
                   <div className='management-list'>
                       <div className='detail-list'>
                       {
                           Array.from(managemen_content_list).map((data,index)=>{
                               return <li key={index}>{data}</li>
                           })
                       }
                       </div>
                   </div>
                   :        
                <div className='management-list'>
                  <div className='detail-list'>
                   <label><input type='checkbox' value='watering' onChange={(e)=>{onHandleCheckBox(e.target.value,e.target.checked)}}/>물 주기</label><br/>
                   <label><input type='checkbox' value='fertilizer' onChange={(e)=>{onHandleCheckBox(e.target.value,e.target.checked)}}/>비료</label><br/>
                   <label><input type='checkbox' value='weed' onChange={(e)=>{onHandleCheckBox(e.target.value,e.target.checked)}}/>잡초 뽑기</label><br/>
                   <label><input type='checkbox' value='fixture_install' onChange={(e)=>{onHandleCheckBox(e.target.value,e.target.checked)}}/>지주대</label><br/>
                   <button onClick={onClickManageDateSave} className='management-input-save-btn'>Save</button>
                 </div>
               </div>
                }

                <div className='harvest'>
                    <label className='harvest-label'>작물수확</label>
                    <button className='harvest-add-btn' onClick={onHandleHarvestList} value={harvestlist}>+</button>
                </div>
                {
                    harvestlist==='none'?
                    <div className='harvest-list'>
                        <div className='detail-list'>
                        {
                            Array.from(harvest_content_list).map((data,index)=>{
                                return <li key={index}>{data}</li>
                            })
                        }
                        </div>
                    </div>
                    :
                    <div className='harvest-list'>
                        <div className='detail-list'>
                    {
                        Array.from(harvestable_crops_array).map((data,index)=>{
                            return (
                            <div key={index}>
                            <label><input type='radio' id={data} checked={plant_input_status===data} onChange={()=>onHandleClickRadioButton(data)}/>{data}</label>
                            </div>
                            )
                        })
                    }
                    <button onClick={onClickHarvest} className='harvest-input-save-btn'>Save</button>
                    </div>
                </div>
                }

                <div className='remove'>
                    <label className='remove-label'>작물제거</label>
                    <button className='remove-add-btn' onClick={onHandleRemoveList} value={removelist}>+</button>
                </div>
                {
                    removelist==='none'?
                    <div className='remove-list'>
                        <div className='detail-list'>
                        {
                            Array.from(remove_content_list).map((data,index)=>{
                                return <li key={index}>{data}</li>
                            })
                        }
                        </div>
                    </div>
                    :
                    <div className='remove-list'>
                        <div className='detail-list'>
                    {
                        Array.from(harvestable_crops_array).map((data,index)=>{
                            return (
                                <div key={index}>
                            <label><input type='radio' id={data} checked={plant_input_status===data} onChange={()=>onHandleClickRadioButton(data)}/>{data}</label>
                            </div>
                            )
                        })
                    }
                    <button onClick={onClickRemove} className='remove-input-save-btn'>Save</button>
                    </div>
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
                    handleDateClick(arg.event.startStr,arg.event.start)
                } 
            }
            dateClick={
                function(arg){
                    handleDateClick(arg.dateStr,arg.date)
                }}
            initialView="dayGridMonth"
            events={
                organize_eventarray

            }
        />
        </div>
        </div>
    </GardenCalendarStyledContainer>
    )
    }
export default MyCalendar