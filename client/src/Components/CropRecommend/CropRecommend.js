import React from 'react'
import Header from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
const croprecommend=({history})=>{
    return(
        <div>
        <HeaderStyledContainer crop_recommend_fontweight>
        <Header history={history}/>
        </HeaderStyledContainer>

            <div className="main">
                <div className="spring">

                </div>
                <div className="summer">

                </div>
                <div className="fall">

                </div>
            </div>
        </div>
    )
}
export default croprecommend