import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react'
import { HeaderStyledContainer } from '../../css/Common/HeaderStyledContainer';
import { MyGardenStyledContainer } from '../../css/MyGarden/MyGardenStyledContainer';
import { FINDFORECAST, FINDMANAGEINFO, FINDUSER, INSERTMOISTURE, INSERTNUTRITION, INSERTWEEDQUANTITY } from '../../Database/Graphql';
import { useStateContext } from '../Common/UserInfoContext';
import { Header } from '../Common/Header'
import { PieChart } from "react-minimal-pie-chart";
//내텃밭위치 날씨 및 현재 토양상태 그래프 출력
const MyGarden = () => {
    const state = useStateContext();
    type userInfoType={
        id:string,
        city:string,
        garden_name:string,
        garden_latitude?:number,
        garden_longitude?:number,
        moisture?:number | undefined,
        nutrition?:number | undefined,
        weed_quantity?:number | undefined,
        watering?:string[] | undefined,
        fertilizer?:string[] | undefined,
        weed?:string[] | undefined
    }
    interface userInfoData{
        findUser:userInfoType
    }
    const findUserInfo = useQuery<userInfoData>(FINDUSER, { errorPolicy: "all" })
    type userManageInfoType={
        fertilizer?:string[],
        watering?:string[],
        weed?:string[],
        fixture_install?:string[]
    }
    interface userManageInfoData{
        findUserManageInfo:userManageInfoType
    }
    const userManageInfo = useQuery<userManageInfoData,{id:String}>(FINDMANAGEINFO, { variables: { id: state.id } })

    const [userInfo, setUserInfo] = useState<userInfoType>({
        id: '',
        city: '',
        garden_name: '',
        garden_latitude: 0.0,
        garden_longitude: 0.0,
        moisture: 0,
        nutrition: 0,
        weed_quantity: 0,
        watering: [],
        fertilizer: [],
        weed: []

    })
    useEffect(() => {
        if (findUserInfo.loading === false && findUserInfo.data?.findUser?.id) {
            setUserInfo({
                id: findUserInfo.data.findUser.id,
                city: findUserInfo.data.findUser.city,
                garden_name: findUserInfo.data.findUser.garden_name,
                garden_latitude: findUserInfo.data.findUser.garden_latitude,
                garden_longitude: findUserInfo.data.findUser.garden_longitude,
                moisture: findUserInfo.data.findUser.moisture,
                nutrition: findUserInfo.data.findUser.nutrition,
                weed_quantity: findUserInfo.data.findUser.weed_quantity,
                watering: findUserInfo.data.findUser.watering,
                fertilizer: findUserInfo.data.findUser.fertilizer,
                weed: findUserInfo.data.findUser.weed
            })
        }
    }, [findUserInfo])
    if (userInfo.id === '') {
        findUserInfo.refetch(FINDUSER)
    }

    //텃밭위치 기상정보 출력
    type forcastType={
        category:string,
        obsrValue:string
    }
    interface forcastData{
        findForecast:forcastType[]
    }
    const [date, setDate] = useState(new Date())
    const [forecastdata, setForecastData] = useState<forcastType[]>([]);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2);
    let hours: string;
    let today_date = year + month + day;
    if (date.getMinutes() <= 40) {
        hours = ('0' + (date.getHours() - 1)).slice(-2)
    } else {
        hours = ('0' + date.getHours()).slice(-2)
    }
    const findForecast = useQuery<forcastData,{lat?:number,long?:number,date?:string,time?:string}>(FINDFORECAST, { variables: { lat: userInfo.garden_latitude, long: userInfo.garden_longitude, date: today_date, time: hours + "00" } })

    //기상관측 데이터
    let temp
    let reh
    let pty
    let wsd
    let rn1
    type pty_listType={
        [index:string]:string,
        0:string,
        1:string,
        2:string,
        3:string,
        5:string,
        6:string,
        7:string
    }
    const pty_list:pty_listType = {
        0: '비/눈 없음',
        1: '비',
        2: '비/눈',
        3: '눈',
        5: '빗방울',
        6: '빗방울눈날림',
        7: '눈날림'
    }

    const onHandleForecast = () => {
        setDate(new Date());
        findForecast.refetch()
    }

    useEffect(() => {
        setForecastData([])

        if (findForecast.loading === false && findForecast.data) {
            findForecast.data.findForecast.map((data: forcastType) => {
                return setForecastData((forecastdata) => [...forecastdata, { category: data.category, obsrValue: data.obsrValue }])
            })
        }
    }, [findForecast])

    forecastdata?.map((data) => {
        if (data.category === 'T1H') {
            temp = data.obsrValue + '℃'
        } else if (data.category === 'REH') {
            reh = data.obsrValue + '%'
        } else if (data.category === 'PTY') {
            pty = pty_list[data.obsrValue]
        } else if (data.category === 'WSD') {
            wsd = data.obsrValue + 'm/s'
        } else if (data.category === 'RN1') {
            rn1 = data.obsrValue + 'mm'
        }
        return data
    })

    //작물관리정보
    const [fertilizer, setFertilizer] = useState<string[] | undefined>([]);
    const [watering, setWatering] = useState<string[] | undefined>([]);
    const [weed, setWeed] = useState<string[] |undefined>([]);

    const [insertMoisture] = useMutation<userManageInfoData,{id:String,moisture:number}>(INSERTMOISTURE, {
        refetchQueries: [
            { query: FINDUSER }
        ],
    })
    const [insertWeedQuantity] = useMutation<userManageInfoData,{id:String,weed_quantity:number}>(INSERTWEEDQUANTITY, {
        refetchQueries: [
            { query: FINDUSER }
        ],
        awaitRefetchQueries: true
    })
    const [insertNutrition] = useMutation<userManageInfoData,{id:String,nutrition:number}>(INSERTNUTRITION, {
        refetchQueries: [
            { query: FINDUSER }
        ],
        awaitRefetchQueries: true
    })
    useEffect(() => {
        if (userManageInfo.data?.findUserManageInfo) {
            setFertilizer(userManageInfo.data?.findUserManageInfo.fertilizer)
            setWatering(userManageInfo.data?.findUserManageInfo.watering)
            setWeed(userManageInfo.data?.findUserManageInfo.weed)
        }
    }, [userManageInfo])

    //매 정각값 출력
    const [sharp, setSharp] = useState<number>(new Date().getHours());
    const time = () => {
        let d = new Date()
        let s = d.getMinutes();
        if (s === 0) {
            setSharp(d.getHours());
        }
    }
    setInterval(time, 1000)

    //수분량,영양상태,잡초량 계산
    const landCalculation = useCallback(() => {
        let datediff:number;

        let sortedWatering: string[];
        let wateringPercent: number = 0;

        let sortedWeed: string[];
        let weedPercent: number = 0;

        let sortedfertilizer: string[];
        let fertilizerPercent: number = 0;

        //수분량 계산
        if(watering){
            if (watering.length > 0) {
                sortedWatering = watering.slice(0, watering.length).sort()
                let temp_date: string = year.toString() + "-" + month.toString() + "-" + day.toString()
    
                datediff = (+new Date(temp_date) - (+new Date(sortedWatering[sortedWatering.length - 1]))) / (1000 * 3600 * 24)
                if (datediff > 5) {
                    insertMoisture({ variables: { id: state.id, moisture: 0 } })
                } else {
                    switch (datediff) {
                        case 0:
                            wateringPercent = 100;
                            weedPercent = 10;
                            break;
                        case 1:
                            wateringPercent = 76;
                            weedPercent = 10;
                            break;
                        case 2:
                            wateringPercent = 52;
                            weedPercent = 10;
                            break;
                        case 3:
                            wateringPercent = 28;
                            weedPercent = 10;
                            break;
                        case 4:
                            wateringPercent = 4;
                            break;
                        default:
                            wateringPercent = 0;
                            break;
                    }
    
                    if (wateringPercent - sharp <= 100 && wateringPercent - sharp > 0) {
                        insertMoisture({ variables: { id: state.id, moisture: wateringPercent - sharp } })
                    } else if (wateringPercent - sharp <= 0) {
                        insertMoisture({ variables: { id: state.id, moisture: 0 } })
                    }
                    else if (wateringPercent - sharp > 100) {
                        insertMoisture({ variables: { id: state.id, moisture: 100 } })
                    }
    
                }
            } else if (watering.length === 0) {
                insertMoisture({ variables: { id: state.id, moisture: 0 } })
            }
        }

        if(weed){
        //잡초량 계산
        if (weed.length > 0) {
            sortedWeed = weed.slice(0, weed.length).sort()
            let temp_date:string = year.toString() + "-" + month.toString() + "-" + day.toString()
            datediff = (+new Date(temp_date) - (+new Date(sortedWeed[sortedWeed.length - 1]))) / (1000 * 3600 * 24)
            if (datediff > 3) {
                insertWeedQuantity({ variables: { id: state.id, weed_quantity: 0 } })
            } else {
                switch (datediff) {
                    case 0:
                        weedPercent += 0;
                        break;
                    case 1:
                        weedPercent += 31.2;
                        break;
                    case 2:
                        weedPercent += 62.4;
                        break;
                    case 3:
                        weedPercent += 93.6;
                        break;
                    default:
                        weedPercent = 100;
                        break;
                }

                let weedvalue:number=weedPercent + (sharp * 1.3)
                if (+parseFloat(String(weedvalue)).toFixed(1) <= 100 && +parseFloat(String(weedvalue)).toFixed(1) > 0) {
                    insertWeedQuantity({ variables: { id: state.id, weed_quantity: parseFloat((weedPercent + (sharp * 1.3)).toFixed(1)) } })
                } else if (parseFloat((weedPercent + (sharp * 1.3)).toFixed(1)) > 100) {
                    insertWeedQuantity({ variables: { id: state.id, weed_quantity: 100 } })
                } else if (parseFloat((weedPercent + (sharp * 1.3)).toFixed(1)) <= 0) {
                    insertWeedQuantity({ variables: { id: state.id, weed_quantity: 0 } })
                }

            }
        } else if (weed.length === 0) {//잡초를 한번도 안 뽑은경우
            insertWeedQuantity({ variables: { id: state.id, weed_quantity: 100 } })
        }
        }
        if(fertilizer){
        //영양상태 계산
        if (fertilizer.length > 0) {
            sortedfertilizer = fertilizer.slice(0, fertilizer.length).sort();
            let temp_date:string = year.toString() + "-" + month.toString() + "-" + day.toString()
            datediff = (+new Date(temp_date) - (+new Date(sortedfertilizer[sortedfertilizer.length - 1]))) / (1000 * 3600 * 24)
            if(userInfo.weed_quantity && userInfo.moisture){
                fertilizerPercent = ((userInfo.moisture * 0.2) - (userInfo.weed_quantity * 0.3))
                if (datediff >= 30) {
                    insertNutrition({ variables: { id: state.id, nutrition: (userInfo.moisture * 0.2) - (userInfo.weed_quantity * 0.3) } })
                } else {
                    if (datediff >= 0 && datediff < 10) {
                        fertilizerPercent += 100;
                        weedPercent += 3;
                    } else if (datediff >= 10 && datediff < 20) {
                        fertilizerPercent += 66.6;
                        weedPercent += 6;
                    } else if (datediff >= 20 && datediff < 30) {
                        fertilizerPercent += 33.3;
                        weedPercent += 9;
                    }
                }
    
                if (parseFloat((fertilizerPercent.toFixed(1))) <= 100 && parseFloat((fertilizerPercent).toFixed(1)) > 0) {
                    insertNutrition({ variables: { id: state.id, nutrition: parseFloat((fertilizerPercent).toFixed(1)) } })
                } else if (parseFloat((fertilizerPercent).toFixed(1)) > 100) {
                    insertNutrition({ variables: { id: state.id, nutrition: 100 } })
                } else if (parseFloat((fertilizerPercent).toFixed(1)) <= 0) {
                    insertNutrition({ variables: { id: state.id, nutrition: 0 } })
                }
            }

        } else if (fertilizer.length === 0) {
            if(userInfo.moisture && userInfo.weed_quantity){
                if ((userInfo.moisture * 0.2) - (userInfo.weed_quantity * 0.3) >= 0) {
                    insertNutrition({ variables: { id: state.id, nutrition: parseFloat(((userInfo.moisture * 0.2) - (userInfo.weed_quantity * 0.3)).toFixed(1)) } })
                } else {
                    insertNutrition({ variables: { id: state.id, nutrition: 0 } })
                }
            }
        }
        }

    }, [day, fertilizer, insertMoisture, insertNutrition, insertWeedQuantity, month, sharp, state.id, watering, weed, year, userInfo.moisture, userInfo.weed_quantity])

    useEffect(() => {
        landCalculation();
    }, [findUserInfo, landCalculation])

    return (
        <div>
            <HeaderStyledContainer my_garden state={state.id}>
                <Header />
            </HeaderStyledContainer>
            <MyGardenStyledContainer>
                <div className="forecast-form">
                    <div></div>
                    <div className="forecast-first">
                        {
                            temp ? <>
                                <div className="forecast-first-sub1">
                                    <label className="temp">{temp}</label>
                                </div>
                                <div className="forecast-first-sub2">
                                    <label>1시간 강수량 : {rn1}</label><br />
                                    <label>습도 : {reh}</label><br />
                                    <label>풍속 : {wsd}</label>
                                </div></> : <label>...loading</label>
                        }
                    </div>
                    <div className="forecast-second">
                        <label className="refresh-label">업데이트 됨 {date.getHours()}:{date.getMinutes()}</label><button onClick={onHandleForecast} className="refresh-btn"><img src="/images/refresh.png" className="refresh-img" alt="refresh-icon" /></button><br />
                        <label>{userInfo.garden_name}</label><br />
                        <label>{pty}</label>
                    </div>
                    <div></div>
                </div>
                <div className="statistics-form">
                    <label></label>
                    <label className="moisture-chart">
                        <PieChart
                            data={[
                                {
                                    title: "name1",
                                    value: userInfo.moisture ? userInfo.moisture : 0,
                                    color: "skyblue",

                                }
                            ]}
                            reveal={userInfo.moisture ? userInfo.moisture : 0}
                            lineWidth={18}
                            background="#f3f3f3"
                            lengthAngle={360}
                            rounded
                            animate
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize: "18px",
                                fill: "#33333",
                            }}
                            labelPosition={0}
                            viewBoxSize={[150, 150]}
                        />
                        <label className="moisture-chart-name">
                            수분량
                        </label>
                    </label>
                    <label className="nutrition-chart">
                        <PieChart
                            data={[
                                {
                                    value: userInfo.nutrition ? userInfo.nutrition : 0,
                                    color: "#FFCC99",
                                    name: "name2"
                                }
                            ]}
                            reveal={userInfo.nutrition ? userInfo.nutrition : 0}
                            lineWidth={18}
                            background="#f3f3f3"
                            lengthAngle={360}
                            rounded
                            animate
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize: "18px",
                                fill: "#33333",
                            }}
                            labelPosition={0}
                            viewBoxSize={[150, 150]}
                        />
                        <label className="nutrition-chart-name">
                            영양상태
                        </label>

                    </label>
                    <label className="weed_quantity-chart">
                        <PieChart
                            data={[
                                {
                                    value: userInfo.weed_quantity ? userInfo.weed_quantity : 0,
                                    color: "green",
                                    name: "name2"
                                }
                            ]}
                            reveal={userInfo.weed_quantity ? userInfo.weed_quantity : 0}
                            lineWidth={18}
                            background="#f3f3f3"
                            lengthAngle={360}
                            rounded
                            animate
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize: "18px",
                                fill: "#33333",
                            }}
                            labelPosition={0}
                            viewBoxSize={[150, 150]}
                        />
                        <div className="weed_quantity-chart-name">
                            잡초량
                        </div>
                    </label>
                    <label></label>
                </div>
            </MyGardenStyledContainer>
        </div>
    )
}

export default MyGarden