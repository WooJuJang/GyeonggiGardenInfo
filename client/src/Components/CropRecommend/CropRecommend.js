import React from 'react'
import Header from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
import { CropReccomendStyledContainer } from '../../css/CropRecommend/CropRecomendStyledContainer'
const croprecommend=({history})=>{
    const moveCrops=(data)=>{
        history.push({pathname:"/crops",state:data})
    }
    return(
        <div>
        <HeaderStyledContainer crop_recommend_fontweight>
        <Header history={history}/>
        </HeaderStyledContainer>
            <CropReccomendStyledContainer>
            <div className="main">
                <div className="spring" onClick={()=>moveCrops('spring')}>
                    <label className="spring-text"  >봄.</label>
                    
                </div>
                <div className="summer" onClick={()=>moveCrops('summer')}>
                    <label className="summer-text">여름.</label>
                    
                </div>
                <div className="fall" onClick={()=>moveCrops('fall')}>
                    <label className="fall-text">가을.</label>
                    
                </div>
            </div>
            </CropReccomendStyledContainer>
        </div>
    )
}
export default croprecommend