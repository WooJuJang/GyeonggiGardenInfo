import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useEffect, useState } from 'react'
import { GardenCalendarStyledContainer } from '../../css/GardenCalendar/GardenCalendarStyledContainer';
import { useMutation, useQuery } from '@apollo/client';
import { FINDUSERPLANTINFO, INSERTUSERCROPS, INSERTHARVESTDATE, INSERTREMOVEDATE, FINDMANAGEINFO, INSERTMANAGEDATE, FINDHOLIDAY } from '../../Database/Graphql';
import { useStateContext } from '../Common/UserInfoContext';
//텃밭달력 
const MyCalendar = () => {
    const state = useStateContext();
    const today = new Date();
    type userPlantInfoType={
        harvest_date:string[],
        id:string,
        plant_date:string[],
        remove_date:string[],
        user_crops:string
    }
    interface userPlantInfoData{
        findUserPlantInfo:userPlantInfoType[]
    }
    const userPlantInfo = useQuery<userPlantInfoData,{id:String}>(FINDUSERPLANTINFO, { variables: { id: state.id } })
    type manageListType={
        [index:string]:string,
        fertilizer: string,
        watering: string,
        weed: string,
        fixture_install: string
    }
    interface userManageInfoData{
        findUserManageInfo:manageListType[]
    }
    const userManageInfo = useQuery<userManageInfoData,{id:String}>(FINDMANAGEINFO, { variables: { id: state.id } })

    type daylistType={
        [index:string]:string,
        Mon:string,
        Tue:string,
        Wed:string,
        Thu:string,
        Fri:string,
        Sat:string,
        Sun:string
    }
    const daylist: daylistType = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday',
    }

    //작물관리 창 변수
    const [plantlist, setPlantList] = useState('none');
    const [managementlist, setManagementList] = useState('none');
    const [harvestlist, setHarvestList] = useState('none');
    const [removelist, setRemoveList] = useState('none');

    //사용자 작물관리 정보 변수
    const [plant_content_list, setPlantContentList] = useState<string[] | string>([]);
    const [managemen_content_list, setManagementContentList] = useState<string[] | string>([]);
    const [harvest_content_list, setHarvestContentList] = useState<string[] | string>([]);
    const [remove_content_list, setRemoveContentList] = useState<string[] | string>([]);
    const [harvestable_crops_array, setHarvestableCropsArray] = useState<string[] | string>([]);

    //공휴일 api 가져오는 쿼리
    type findHolidayType={
        dateName:string,
        locdate:number
    }
    const findHoliday = useQuery(FINDHOLIDAY, { variables: { year: String(today.getFullYear()) } })

    //사용자 작물관리 정보 출력
    type oranizeEventType={
        title:string[],
        date:string,
        color:string
    }
    const [organize_eventarray, setOrganizeEventarray] = useState<oranizeEventType[]>([]);

    //달력 이벤트
    type eventType={
        title:string,
        date:string
    }
    useEffect(() => {
        let eventarray: eventType[] = [];

        const manage_list:any = {
            fertilizer: "비료 주기",
            watering: "물 주기",
            weed: "잡초 뽑기",
            fixture_install: "지주대 설치"
        }
        setOrganizeEventarray([])
        setHarvestableCropsArray([])
        //공휴일 데이터 정돈된 이벤트배열에 추가
        if (findHoliday.loading === false && findHoliday?.data) {
            findHoliday.data.findHoliday.forEach((data: findHolidayType) => {
                let date = String(data.locdate)
                setOrganizeEventarray(prev => [...prev, { title: [data.dateName], date: date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2), color: 'red' }])
            })

            //사용자 작물정보 이벤트배열에 추가
            userPlantInfo.data?.findUserPlantInfo.forEach((data: userPlantInfoType) => {

                if (data.plant_date) {
                    data.plant_date.forEach((plant_day: string) => {
                        eventarray.push({ title: data.user_crops + '심기', date: plant_day })
                    })
                }
                if (data.harvest_date) {
                    data.harvest_date.forEach((harvest_day: string) => {
                        eventarray.push({ title: data.user_crops + '수확', date: harvest_day })
                    })
                }
                if (data.remove_date) {
                    data.remove_date.forEach((remove_day: string) => {
                        eventarray.push({ title: data.user_crops + '제거', date: remove_day })
                    })
                }
                if (!data.remove_date[0]) {
                    setHarvestableCropsArray((harvestable_crops_array: string[]|string) => [...harvestable_crops_array, data.user_crops])
                }
            })

            //사용자 작물관리 정보 이벤트배열에 추가
            const usermanageinfo:manageListType[] | undefined= userManageInfo.data?.findUserManageInfo
            if (usermanageinfo) {
                for (let prop in usermanageinfo ) {
                    //prop값은 string이라는 타입의 이름으로 객체에 접근하기에 바로 사용하면 타입에러 뜸
                    if (prop !== '__typename') {
                        if (usermanageinfo[prop]) {
                            for(let i=0;i<Number(usermanageinfo[prop].length);i++){
                                eventarray.push({title:manage_list[prop],date:usermanageinfo[prop][i]})
                            }
                        }
                    }
                }
            }
            //사용자 작물관리 정보 중복삭제 및 같은 날짜로 작업 묶기 
            eventarray?.forEach((data:eventType) => {
                let titlearray: string[] = [];
                eventarray.forEach((a:eventType) => {
                    if (a.date === data.date) {
                        titlearray.push(a.title)
                    }
                })
                setOrganizeEventarray((prev) => ([...prev, { title: titlearray, date: data.date, color: 'green' }]))
            })
        }
    }, [userPlantInfo, userManageInfo, findHoliday, userManageInfo.data?.findUserManageInfo, userPlantInfo.data?.findUserPlantInfo])

    //이벤트 배열 중복값 제거 => 최종 출력용 배열 생성
    const [organizedOutputEventArray, setOrganizedOutputEventArray] = useState<any[]>([])
    useEffect(() => {
        setOrganizedOutputEventArray(organize_eventarray.reduce((accumalator:oranizeEventType[], current:oranizeEventType):oranizeEventType[] => {
            if (!accumalator.some((item: oranizeEventType) => item.date === current.date && item.color === current.color)) {
                accumalator.push(current)
            }
            return accumalator
        }, []))
    }, [organize_eventarray])

    //날짜 클릭 이벤트
    const [selectDate, setSelectDate] = useState(today.getDate())
    const [select_full_date, setSelectFullDate] = useState('')
    const [day, setDay] = useState<string>(daylist[String(today).split(' ')[0]])

    const handleDateClick = (dateStr: string, fulldate: string) => {
        setPlantList('none')
        setManagementList('none')
        setHarvestList('none')
        setRemoveList('none')
        setSelectFullDate(dateStr)
        setSelectDate(Number(dateStr.split('-')[2]))
        setDay(daylist[String(fulldate).split(' ')[0]])
        formatEventArray(dateStr);
    }
    const reset = () => {
        setPlantContentList('')
        setHarvestContentList('')
        setRemoveContentList('')
        setManagementContentList('')
        setCheckboxStatus([])
    }
    //날짜 클릭시 관련 이벤트 출력
    const formatEventArray = (dateStr: string) => {
        reset();
        const events = organizedOutputEventArray.filter((data: oranizeEventType) => {

            if (data.date.includes(dateStr)) {
                return data
            } else {
                return false
            }

        })
        events.forEach((event_data: oranizeEventType) => {
            if (event_data?.color === 'green') {
                event_data?.title.forEach((data: string) => {
                    const work = data.substr(data.length - 2, 2);
                    if (work === '심기') {
                        setPlantContentList((plant_content_list: string[]|string) => [...plant_content_list, data])
                    } else if (work === '수확') {
                        setHarvestContentList((harvest_content_list: string[]|string) => [...harvest_content_list, data])
                    } else if (work === '제거') {
                        setRemoveContentList((remove_content_list: string[]|string) => [...remove_content_list, data])
                    } else {
                        setManagementContentList((managemen_content_list: string[]|string) => [...managemen_content_list, data])
                    }
                })
            }
        })
    }
    //작물관리창 display변경 함수
    const onHandlePlantList = (e:React.MouseEvent<HTMLButtonElement>) => {
        setPlantInputStatus('')
        const target=e.target as HTMLButtonElement
        if (target.value === 'none') {
            setPlantList('block')
            setManagementList('none')
            setHarvestList('none')
            setRemoveList('none')
        } else {
            setPlantList('none')
        }
    }
    const onHandleManagementList = (e:React.MouseEvent<HTMLButtonElement>) => {
        setPlantInputStatus('')
        const target=e.target as HTMLButtonElement
        if (target.value === 'none') {
            setPlantList('none')
            setManagementList('block')
            setHarvestList('none')
            setRemoveList('none')
        } else {
            setManagementList('none')
        }
    }
    const onHandleHarvestList = (e:React.MouseEvent<HTMLButtonElement>) => {
        setPlantInputStatus('')
        const target=e.target as HTMLButtonElement
        if (target.value === 'none') {
            setPlantList('none')
            setManagementList('none')
            setHarvestList('block')
            setRemoveList('none')
        } else {
            setHarvestList('none')
        }
    }
    const onHandleRemoveList = (e:React.MouseEvent<HTMLButtonElement>) => {
        setPlantInputStatus('')
        const target=e.target as HTMLButtonElement
        if (target.value === 'none') {
            setPlantList('none')
            setManagementList('none')
            setHarvestList('none')
            setRemoveList('block')
        } else {
            setRemoveList('none')
        }
    }

    //작물작업 추가
    const [input_plant, setInputPlant] = useState('')
    const [plant_input_status, setPlantInputStatus] = useState('')
    const [checkbox_status, setCheckboxStatus] = useState<string[]>([])
    const [insertUserCrops] = useMutation(INSERTUSERCROPS,
        {
            refetchQueries: [
                {
                    query: FINDUSERPLANTINFO,
                    variables: { id: state.id }
                }
            ], awaitRefetchQueries: true
            , onCompleted: (data) => formatEventArray(select_full_date),
        }
    )
    const [insertHarvestDate] = useMutation(INSERTHARVESTDATE,
        {
            refetchQueries: [
                {
                    query: FINDUSERPLANTINFO,
                    variables: { id: state.id }
                }
            ], awaitRefetchQueries: true
            , onCompleted: (data) => formatEventArray(select_full_date),
        }
    )
    const [insertRemoveDate] = useMutation(INSERTREMOVEDATE,
        {
            refetchQueries: [
                {
                    query: FINDUSERPLANTINFO,
                    variables: { id: state.id }
                }
            ], awaitRefetchQueries: true
            , onCompleted: (data) => formatEventArray(select_full_date),
        }
    )
    const [insertManageDate] = useMutation(INSERTMANAGEDATE, {
        refetchQueries: [
            {
                query: FINDMANAGEINFO,
                variables: { id: state.id }
            }
        ],
        awaitRefetchQueries: true
        , onCompleted: (data) => formatEventArray(select_full_date),
    })
    //작물작업 추가-작물심기
    const onChangePlant = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPlant(e.target.value)
    }
    const onClickPlant = () => {
        insertUserCrops({ variables: { id: state.id, user_crops: input_plant, plant_date: select_full_date } })
        setInputPlant('')
    }
    //작물작업 추가-작물관리
    const onHandleCheckBox = (id: string, checked: boolean) => {
        if (checked) {
            setCheckboxStatus([...checkbox_status, id])
        } else {
            setCheckboxStatus(checkbox_status.filter((data: string) => data !== id))
        }
    }
    const onHandleClickRadioButton = (radioBtnName: string) => {
        setPlantInputStatus(radioBtnName)
    }
    type ManageDateSaveType={
        [index:string]:string,
        fertilizer: string,
        watering: string,
        weed: string,
        fixture_install: string
    }
    const onClickManageDateSave = () => {
        let select_full_date_list: ManageDateSaveType = {
            fertilizer: "",
            watering: "",
            weed: "",
            fixture_install: ""
        }
        for (let data in checkbox_status) {
            select_full_date_list[checkbox_status[data]] = select_full_date
        }
        insertManageDate({ variables: { id: state.id, fertilizer: select_full_date_list['fertilizer'], watering: select_full_date_list['watering'], weed: select_full_date_list['weed'], fixture_install: select_full_date_list['fixture_install'] } })
    }
    //작물작업 추가-작물수확
    const onClickHarvest = () => {
        insertHarvestDate({ variables: { id: state.id, user_crops: plant_input_status, harvest_date: select_full_date } })
    }
    //작물작업 추가-작물제거
    const onClickRemove = () => {
        insertRemoveDate({ variables: { id: state.id, user_crops: plant_input_status, remove_date: select_full_date } })
    }

    return (
        <GardenCalendarStyledContainer plantlist={plantlist} managementlist={managementlist} harvestlist={harvestlist} removelist={removelist}>
            <div className='main-form'>
                <div className='todo-form'>
                    <div className='todo'>
                        <label className="todo-date">{selectDate}</label>
                        <label className="todo-day">{day}</label>
                        <br />
                        <div className='plant'>
                            <label className='plant-label' >작물심기</label>
                            <button className='plant-add-btn' onClick={onHandlePlantList} value={plantlist}>+</button>
                        </div>
                        {plantlist === 'none'
                            ?
                            <div className='plant-list'>
                                <div className='detail-list'>
                                    {
                                        Array.from(plant_content_list).map((data:string, index:number) => {
                                            return <li key={index}>{data}</li>
                                        })
                                    }
                                </div>
                            </div>
                            : <div className='plant-list'>

                                <input value={input_plant} onChange={onChangePlant} className='plant-input' required></input>
                                <button onClick={onClickPlant} className='plant-input-add-btn'>Add</button>

                            </div>}

                        <div className='management'>
                            <label className='management-label'>작물관리</label>
                            <button className='management-add-btn' onClick={onHandleManagementList} value={managementlist}>+</button>
                        </div>
                        {
                            managementlist === 'none' ?
                                <div className='management-list'>
                                    <div className='detail-list'>
                                        {
                                            Array.from(managemen_content_list).map((data:string, index:number) => {
                                                return <li key={index}>{data}</li>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className='management-list'>
                                    <div className='detail-list'>
                                        <label><input type='checkbox' value='watering' onChange={(e) => { onHandleCheckBox(e.target.value, e.target.checked) }} />물 주기</label><br />
                                        <label><input type='checkbox' value='fertilizer' onChange={(e) => { onHandleCheckBox(e.target.value, e.target.checked) }} />비료</label><br />
                                        <label><input type='checkbox' value='weed' onChange={(e) => { onHandleCheckBox(e.target.value, e.target.checked) }} />잡초 뽑기</label><br />
                                        <label><input type='checkbox' value='fixture_install' onChange={(e) => { onHandleCheckBox(e.target.value, e.target.checked) }} />지주대</label><br />
                                        <button onClick={onClickManageDateSave} className='management-input-save-btn'>Save</button>
                                    </div>
                                </div>
                        }

                        <div className='harvest'>
                            <label className='harvest-label'>작물수확</label>
                            <button className='harvest-add-btn' onClick={onHandleHarvestList} value={harvestlist}>+</button>
                        </div>
                        {
                            harvestlist === 'none' ?
                                <div className='harvest-list'>
                                    <div className='detail-list'>
                                        {
                                            Array.from(harvest_content_list).map((data:string, index :number) => {
                                                return <li key={index}>{data}</li>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className='harvest-list'>
                                    <div className='detail-list'>
                                        {
                                            Array.from(harvestable_crops_array).map((data : string, index :number) => {
                                                return (
                                                    <div key={index}>
                                                        <label><input type='radio' checked={plant_input_status === data} onChange={() => onHandleClickRadioButton(data)} />{data}</label>
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
                            removelist === 'none' ?
                                <div className='remove-list'>
                                    <div className='detail-list'>
                                        {
                                            Array.from(remove_content_list).map((data: string, index:number) => {
                                                return <li key={index}>{data}</li>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className='remove-list'>
                                    <div className='detail-list'>
                                        {
                                            Array.from(harvestable_crops_array).map((data:string, index:number) => {
                                                return (
                                                    <div key={index}>
                                                        <label><input type='radio' checked={plant_input_status === data} onChange={() => onHandleClickRadioButton(data)} />{data}</label>
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
                        plugins={[dayGridPlugin, interactionPlugin]}
                        eventClick={
                            function (arg) {
                                handleDateClick(arg.event.startStr, String(arg.event.start))
                            }
                        }
                        dateClick={
                            function (arg) {
                                handleDateClick(arg.dateStr, String(arg.date))
                            }}
                        initialView="dayGridMonth"
                        events={
                            organizedOutputEventArray
                        }
                    />
                </div>
            </div>
        </GardenCalendarStyledContainer>
    )
}
export default MyCalendar