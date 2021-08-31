import React from 'react';
import Header from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
const Crops=({history})=>{
    console.log(history.location.state)
    return (
        <div>
            <HeaderStyledContainer crop_recommend_fontweight>
            <Header history={history}/>
            </HeaderStyledContainer>
            {history.location.state}
        </div>
    )
}

export default Crops