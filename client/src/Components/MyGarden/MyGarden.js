import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer';
import { MyGardenStyledContainer } from '../../css/MyGarden/MyGardenStyledContainer';
import { FINDFORECAST, FINDUSER } from '../../Database/Graphql';
import { UserInfoContext } from '../../UserInfoContext';
import { Header } from '../Common/Header'
const MyGarden = () => {
    let history = useHistory();
    const { state } = useContext(UserInfoContext)
    const findUserInfo = useQuery(FINDUSER, { errorPolicy: "all" })
    const [userInfo, setUserInfo] = useState({
        id: '',
        city: '',
        garden_name: '',
        garden_latitude: 0.0,
        garden_longitude: 0.0,
        moisture: '',
        nutrition: '',
        weed_quantity: '',

    })
    if (userInfo.id === '') {
        findUserInfo.refetch(FINDUSER)
    }
    useEffect(() => {
        console.log('finduserinfo change')
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
            })
        }
        if (findUserInfo.error) {
            console.log(findUserInfo.error)
        }
    }, [findUserInfo])

    const [date, setDate] = useState(new Date())
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2);
    let hours;
    if (date.getMinutes() <= 40) {
        hours = ('0' + (date.getHours() - 1)).slice(-2)
    } else {
        hours = ('0' + date.getHours()).slice(-2)
    }

    const findForecast = useQuery(FINDFORECAST, { variables: { lat: userInfo.garden_latitude, long: userInfo.garden_longitude, date: year + month + day, time: hours + "00" } })
    const [forecastdata, setForecastData] = useState([]);
    useEffect(() => {
        console.log("finForcast")
        setForecastData([])
        if (findForecast.loading === false && findForecast.data) {
            console.log("in")
            findForecast.data.findForecast.map((data) => {
                setForecastData((forecastdata) => [...forecastdata, { category: data.category, obsrValue: data.obsrValue }])
            })
        }
    }, [findForecast])
    const onHandleForecast = () => {

        setDate(new Date());
        findForecast.refetch({ variables: { lat: userInfo.garden_latitude, long: userInfo.garden_longitude, date: year + month + day, time: hours + "00" } })
    }
    let temp
    let reh
    let pty
    let wsd
    let rn1
    const pty_list = {
        0: '비/눈 없음',
        1: '비',
        2: '비/눈',
        3: '눈',
        5: '빗방울',
        6: '빗방울눈날림',
        7: '눈날림'
    }
    console.log(findForecast)
    console.log(forecastdata)


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
    })



    return (
        <div>
            <HeaderStyledContainer my_garden state={state.id}>
                <Header history={history} />
            </HeaderStyledContainer>
            <MyGardenStyledContainer>
                <div className="forecast-form">
                    <div></div>
                    <div className="forecast-first">
                        {
                            temp? <>
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
                        <label className="refresh-label">업데이트 됨 {date.getHours()}:{date.getMinutes()}</label><button onClick={onHandleForecast} className="refresh-btn"><img src="/images/refresh.png" className="refresh-img" /></button><br />
                        <label>{userInfo.garden_name}</label><br />
                        <label>{pty}</label>

                    </div>
                    <div></div>
                </div>
            </MyGardenStyledContainer>
        </div>
    )
}

export default MyGarden