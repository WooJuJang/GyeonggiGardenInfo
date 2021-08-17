import React from "react";
import { HeaderStyledContainer } from "../css/HeaderStyledContainer";
import Header from "./Header";
import {GardenLocationStyledContainter} from "../css/GardenLocationStyledContainter";

const GardenLocation =()=>{
    return(
        <div>
            <HeaderStyledContainer garden_location_fontweight>
            <Header/>
            </HeaderStyledContainer>
            <GardenLocationStyledContainter>
            <div className='main-form'>
                <div>
                    <div>
                        <label>원하는 지역을 입력해주세요.</label>
                    </div>
                    <div>
                        정보
                    </div>
                    <div>
                        지도
                        <button>신청하기</button>
                    </div>
                </div>
            </div>
            </GardenLocationStyledContainter>
        </div>
        
    )

}
export default GardenLocation