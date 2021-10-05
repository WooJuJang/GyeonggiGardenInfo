import React, { useContext, useEffect } from 'react'
import { HeaderStyledContainer } from '../css/HeaderStyledContainer'
import {MainStyledContainer} from '../css/MainStyledContainer'
import { UserInfoContext } from '../UserInfoContext'
import {Header} from './Common/Header'
import { TimerContext } from './Common/Timer'

function Main({history}){
    const {state}=useContext(UserInfoContext)
    const timer=useContext(TimerContext)
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