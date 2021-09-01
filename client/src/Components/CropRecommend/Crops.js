import React, { useEffect, useState } from 'react';
import Header from '../Common/Header'
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer'
import { useQuery } from '@apollo/client';
import { FINDSEASON } from '../../Database/Graphql';
import { CropStyledContainer } from '../../css/CropRecommend/CropStyledContainer';
const Crops = ({ history }) => {
    
 
    const cropsInfo = useQuery(FINDSEASON, { variables: { season: history.location.state } })
    const [cropInfo, setCropInfo] = useState({
        crops: '',
        belong: '',
        interval: '',
        fixture: '',
        water: '',
        plant: '',
        explain: '',
        harvest: '',
        harvestable_crops: '',
        image:'',

    })

   useEffect(()=>{
       if(cropsInfo.data && cropsInfo.loading===false)
        setCropInfo({
            crops:cropsInfo.data.findSeason[0].crops,
            belong: cropsInfo.data.findSeason[0].belong,
            interval: cropsInfo.data.findSeason[0].interval,
            fixture: cropsInfo.data.findSeason[0].fixture,
            water: cropsInfo.data.findSeason[0].water,
            plant:cropsInfo.data.findSeason[0].plant,
            explain:cropsInfo.data.findSeason[0].explain,
            harvest: cropsInfo.data.findSeason[0].harvest,
            harvestable_crops: cropsInfo.data.findSeason[0].harvestable_crops,
            image:cropsInfo.data.findSeason[0].image,
        })
   },[cropsInfo.data])
    const SelectedCropInfo = (e) => {
        let cropname = e.target.innerText.split("|")[0]
        for (let i = 0; i < cropsInfo.data.findSeason.length; i++) {
            if (cropsInfo.data.findSeason[i].crops === cropname) {
                
                setCropInfo({
                    crops: cropsInfo.data.findSeason[i].crops,
                    belong: cropsInfo.data.findSeason[i].belong,
                    interval: cropsInfo.data.findSeason[i].interval,
                    fixture: cropsInfo.data.findSeason[i].fixture,
                    water: cropsInfo.data.findSeason[i].water,
                    plant: cropsInfo.data.findSeason[i].plant,
                    explain: cropsInfo.data.findSeason[i].explain,
                    harvest: cropsInfo.data.findSeason[i].harvest,
                    harvestable_crops: cropsInfo.data.findSeason[i].harvestable_crops,
                    image:cropsInfo.data.findSeason[i].image
                })
            }
        }

        
        
    }
    return (
        <div>
            <HeaderStyledContainer crop_recommend_fontweight>
                <Header history={history} />
            </HeaderStyledContainer>
            <CropStyledContainer image={cropInfo.image} crop={cropInfo.crops}>
                
                <div className="main-form">
                    <div className="crop-img-form">
                        <div className="crop-img"></div>
                    </div>
                    <div className="crop-info">
                        <div className="crop-name-list">
                            {cropsInfo.data && cropsInfo.data.findSeason.map(
                                (info, key) =>
                                    <label key={key} onClick={SelectedCropInfo} className={info.crops}>{info.crops + "|"}</label>)
                            }
                        </div>
                        <div className="crop-name">
                            {cropInfo.crops}
                        </div>
                        <div className="crop-detail">
                            {cropInfo.belong}
                        </div>
                        <div className="crop-detail">
                            <label>적기: {cropInfo.plant}월 심기 {cropInfo.harvest}월 수확</label>
                        </div>
                        <div className="crop-detail">
                            {cropInfo.explain}
                        </div>
                        <div className="crop-detail">
                            <label>심는 간격</label><br />
                            <label>모종 간격 {cropInfo.interval}cm</label>
                        </div>
                        <div className="crop-detail">
                            <label>지주대 세우기</label><br />
                            {cropInfo.fixture ? <label>{cropInfo.crops}모종을 심은 다음 지주를 모종 옆에 세우고 묶어 둔다.</label>
                                : <label>지주대를 설치하지 않아도 된다.</label>}

                        </div>
                        <div className="crop-detail">
                            <label>물 관리</label><br />
                            <label>비가 내리지 않을 떄는 보통 {cropInfo.water}일 간격으로 물을 준다.</label>
                        </div>
                    </div>
                </div>
              
            </CropStyledContainer>
        </div>
    )
}

export default Crops