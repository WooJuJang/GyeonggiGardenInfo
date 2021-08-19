import React, { useEffect, useState } from "react";
import { HeaderStyledContainer } from "../../css/HeaderStyledContainer";
import Header from "../Common/Header";
import {GardenLocationStyledContainter} from "../../css/GardenLocationStyledContainter";
import { Location } from "../Common/Location";
import {FINDGARDENSGNM,FINDGARDENDETAILINFO,FINDUSER} from '../../Database/Graphql'
import { useQuery } from "@apollo/client";
import RegistPopUp from "./RegistPopUp";
import { getCookie, setCookie } from "../Auth/Cookis";
import { RegistPopUpStyledContainer } from "../../css/GgGardenLocation/RegistPopUpStyledContainer";

const GardenLocation =({history})=>{
    const [renderingBtn,setRenderingBtn]=useState(true)
    const [gardenDetailInfo,setGardenDetailInfo]=useState({
        SG_NM:'',
        OPERT_MAINBD_NM:'',
        KITGDN_NM:'',
        SUBFACLT_CONT:'',
        LOTOUT_PC_CONT:'',
        REFINE_LOTNO_ADDR:'',
        REFINE_WGS84_LOGT:'',
        REFINE_WGS84_LAT:''
    })
    const [input_area,setInput_area]=useState('')
    const [gardenInfo,setGardenInfo]=useState([''])
    const [gardenNmInfo,setGardenNmInfo]=useState([''])
    const findGardenNm=useQuery(FINDGARDENSGNM,{variables:{area:input_area}})

    const [detailInfo,setDetailInfo]=useState('')
    const findGardenDetailInfo=useQuery(FINDGARDENDETAILINFO,{variables:{area:detailInfo}})
    
    const onHandleChange=(e)=>{
        setInput_area(e.target.value)
    }
    const onClickHandle=()=>{
        
       findGardenNm.refetch(FINDGARDENSGNM,{variables:{area:input_area}})
       setRenderingBtn(!renderingBtn)
    }
    useEffect(()=>{
       
        if(findGardenNm.loading===false && findGardenNm.data){
            setGardenNmInfo(findGardenNm.data)
        }
       
     },[renderingBtn])
const onHandleSGNM=(e)=>{
    setDetailInfo(e.target.innerText)
    setGardenDetailInfo({
        SG_NM:e.target.innerText
    })
    findGardenDetailInfo.refetch(FINDGARDENDETAILINFO,{variables:{area:detailInfo}})
}
useEffect(()=>{
    if(findGardenDetailInfo.loading===false && findGardenDetailInfo.data){
        setGardenInfo(findGardenDetailInfo.data)
    }


       
},[findGardenDetailInfo.data])

const onHandleInfo=(e)=>{
    var garden_nm=e.target.innerText;
    for(let i=0;i<gardenInfo.findGardenDetailInfo.length;i++){
        if(gardenInfo.findGardenDetailInfo[i].KITGDN_NM===garden_nm){
            setGardenDetailInfo(gardenDetailInfo=>({...gardenDetailInfo,
                
                OPERT_MAINBD_NM:gardenInfo.findGardenDetailInfo[i].OPERT_MAINBD_NM,
                KITGDN_NM:gardenInfo.findGardenDetailInfo[i].KITGDN_NM,
                SUBFACLT_CONT:gardenInfo.findGardenDetailInfo[i].SUBFACLT_CONT,
                LOTOUT_PC_CONT:gardenInfo.findGardenDetailInfo[i].LOTOUT_PC_CONT,
                REFINE_LOTNO_ADDR:gardenInfo.findGardenDetailInfo[i].REFINE_LOTNO_ADDR,
                REFINE_WGS84_LOGT:gardenInfo.findGardenDetailInfo[i].REFINE_WGS84_LOGT,
                REFINE_WGS84_LAT:gardenInfo.findGardenDetailInfo[i].REFINE_WGS84_LAT
            }))
           
        }
    }
    console.log(gardenDetailInfo)
}
const [popupOpen,setPopUpOpen]=useState(false)
const findUserInfo=useQuery(FINDUSER)
const [userInfo,setUserInfo]=useState({
    id:'',
    city:''
})
useEffect(()=>{
    if(findUserInfo.loading ===false && findUserInfo.data){
    setUserInfo({        
        id:findUserInfo.data.findUser.id,
        city:findUserInfo.data.findUser.city,
        garden_name:findUserInfo.data.findUser.garden_name
    })

}
},[findUserInfo])

const openPopUp=()=>{
    if(getCookie('token')){
        findUserInfo.refetch(FINDUSER)
        if(!userInfo.garden_name){
            if(userInfo.city===gardenDetailInfo.SG_NM){
                setPopUpOpen(true)
            }else{
                alert('거주지가 다릅니다.')
            }
        }else{
            alert('이미 텃밭을 신청했습니다.')
        }

        
    }else{
        history.push('/signin')
    }
}
const closePopUp=()=>{
    setPopUpOpen(false)
}
    return(
        <div>
            <HeaderStyledContainer garden_location_fontweight>
            <Header history={history}/>
            </HeaderStyledContainer>
            <GardenLocationStyledContainter>
            <div className='main-form'>
                <div className='sub-form'>
                    <div className='item__input'>
                        <label>원하는 지역을 입력해주세요.</label>
                        <br/>
                        <input value={input_area} onChange={onHandleChange}></input>
                        <button onClick={onClickHandle}>Search</button>
                        <br/>
                        {gardenNmInfo.findGardenSGNM && gardenNmInfo.findGardenSGNM.map((sg,index)=><li key={index} onClick={onHandleSGNM}>{sg}</li>)}
                    </div>
                    <div className='item__info'>
                {gardenInfo.findGardenDetailInfo &&gardenInfo.findGardenDetailInfo.map((elem,index)=>
            <div key={index}>
            <li onClick={onHandleInfo} >{elem.KITGDN_NM}</li>
            <p>{elem.REFINE_LOTNO_ADDR}</p>
            </div>
        )}
                    </div>
                    <div className='item__map'>
                       <Location address={gardenDetailInfo.REFINE_LOTNO_ADDR} logt={gardenDetailInfo.REFINE_WGS84_LOGT} lat={gardenDetailInfo.REFINE_WGS84_LAT}/>
                        <br/>
                        <button onClick={openPopUp}>신청하기</button>
                        <RegistPopUpStyledContainer>
                        <RegistPopUp open={popupOpen} close={closePopUp} data={gardenDetailInfo}>

                        </RegistPopUp>
                        </RegistPopUpStyledContainer>
                    </div>
                </div>
            </div>
            </GardenLocationStyledContainter>
        </div>
        
    )

}
export default GardenLocation