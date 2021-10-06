import React, { useContext, useEffect } from 'react'
import { HeaderStyledContainer } from '../css/Common/HeaderStyledContainer'
import {MainStyledContainer} from '../css/MainStyledContainer'
import { UserInfoContext } from './Common/UserInfoContext'
import {Header} from './Common/Header'
import { TimerContext } from './Common/TimerContext'

function Main({history}){
    const {state}=useContext(UserInfoContext)
    const timer=useContext(TimerContext)

    //자동로그아웃 타이머 시작
    useEffect(()=>{
        timer.timerdispatch({type:'TIMER_START'})
    },[timer])
        

    return( 
        <MainStyledContainer>
            <div className='main-form'>
                <div className='blackbox'>
                    <HeaderStyledContainer main state={state.id}>
                    <Header history={history} />
                    </HeaderStyledContainer>
                    <div className='main-text-form'>
                    <label className='text'>Creating a healthy and prosperous world.</label>
                    </div>
                </div>
            </div> 
        </MainStyledContainer>
      
    ) 
}

export default Main