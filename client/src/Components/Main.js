import React, { useContext } from 'react'
import { HeaderStyledContainer } from '../css/HeaderStyledContainer'
import {MainStyledContainer} from '../css/MainStyledContainer'
import { UserInfoContext } from '../UserInfoContext'
import {Header} from './Common/Header'

function Main({history}){
    const {state}=useContext(UserInfoContext)
    
    return( 
        <MainStyledContainer>
            <div className='main-form'>
                <div className='blackbox'>
                    <HeaderStyledContainer main state={state.id}>
                    <Header history={history} />
                    </HeaderStyledContainer>
                    <div className='main-text-form'>
                    <label >Creating a healthy and prosperous world.</label>
                    </div>
                </div>
            </div> 
        </MainStyledContainer>
      
    ) 
}

export default Main