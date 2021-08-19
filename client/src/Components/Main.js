import React from 'react'
import {MainStyledContainer} from '../css/MainStyledContainer'
import Header from './Common/Header'
function Main({history}){
    return(
        <MainStyledContainer>
            <div className='main-form'>
                <div className='blackbox'>
                    <Header history={history} />
                    <div className='main-text-form'>
                    <label >Creating a healthy and prosperous world.</label>
                    </div>
                </div>
            </div> 
        </MainStyledContainer>
    ) 
}

export default Main