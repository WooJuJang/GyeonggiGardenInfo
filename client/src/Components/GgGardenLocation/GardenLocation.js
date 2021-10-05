import React, { useContext, useEffect, useState } from "react";
import { HeaderStyledContainer } from "../../css/HeaderStyledContainer";
import {Header} from "../Common/Header";
import {GardenLocationStyledContainter} from "../../css/GardenLocationStyledContainter";
import { Location } from "../Common/Location";
import {FINDGARDENSGNM,FINDGARDENDETAILINFO,FINDUSER,FINDLOGTLAT} from '../../Database/Graphql'
import { useQuery,useLazyQuery } from "@apollo/client";
import RegistPopUp from "./RegistPopUp";
import { getCookie} from "../Auth/Cookis";
import { RegistPopUpStyledContainer } from "../../css/GgGardenLocation/RegistPopUpStyledContainer";
import Posts from './Posts'
import Pagination from './Pagination'
import { UserInfoContext } from "../../UserInfoContext";

const GardenLocation =({history})=>{

    const [gardenDetailInfo,setGardenDetailInfo]=useState({
        SG_NM:'',
        OPERT_MAINBD_NM:'',
        KITGDN_NM:'',
        SUBFACLT_CONT:'',
        LOTOUT_PC_CONT:'',
        REFINE_LOTNO_ADDR:'경기도 안성시 공도읍 275-17',
        REFINE_WGS84_LOGT:'127.165263172353',
        REFINE_WGS84_LAT:'37.0035656380062'
    })
    const [input_area,setInput_area]=useState('')
    const [gardenInfo,setGardenInfo]=useState([''])
    const [gardenNmInfo,setGardenNmInfo]=useState([''])
    const [findGardenNm]=useLazyQuery(FINDGARDENSGNM,{onCompleted:data=>setGardenNmInfo(data)})

    const [detailInfo,setDetailInfo]=useState('')
    const findGardenDetailInfo=useQuery(FINDGARDENDETAILINFO,{variables:{area:detailInfo}})
    const findLogtLat=useQuery(FINDLOGTLAT,{variables:{address:gardenDetailInfo.REFINE_LOTNO_ADDR}})
    const findUserInfo=useQuery(FINDUSER)

    const {state}=useContext(UserInfoContext)

    const onHandleChange=(e)=>{
        setInput_area(e.target.value)
    }

    /* 지역이름 검색 및 지역 출력 */
    const onClickHandle=()=>{
        if(input_area!==""){
            findGardenNm({variables:{area:input_area}})
        }
    }

    /* 선택된 지역에 속한 농장 정보 출력 */
    const onHandleSGNM=(e)=>{
        setCurrentPage(1)
        setDetailInfo(e.target.innerText)
        setGardenDetailInfo({
            //...prev,
            SG_NM:e.target.innerText,
            REFINE_LOTNO_ADDR:'경기도 안성시 공도읍 275-17',
            REFINE_WGS84_LOGT:'127.165263172353',
            REFINE_WGS84_LAT:'37.0035656380062'

        })
        findUserInfo.refetch(FINDUSER)
    }
    useEffect(()=>{
        if(gardenDetailInfo.SG_NM!==''){
            setLoading(true)
            if(findGardenDetailInfo.loading===false && findGardenDetailInfo.data){
                setGardenInfo(findGardenDetailInfo.data)
                setPostsLength(findGardenDetailInfo.data.findGardenDetailInfo.length);
                setLoading(false)
            }
        }
    },[gardenDetailInfo.SG_NM,findGardenDetailInfo.data,findGardenDetailInfo.loading])

const [popupOpen,setPopUpOpen]=useState(false)

const [userInfo,setUserInfo]=useState({
    id:'',
    city:'',
    garden_nm:''
})

useEffect(()=>{
    if(findUserInfo?.loading ===false && findUserInfo.data?.findUser){
    setUserInfo({        
        id:findUserInfo.data.findUser.id,
        city:findUserInfo.data.findUser.city,
        garden_name:findUserInfo.data.findUser.garden_name
    })
}
},[findUserInfo])

const openPopUp=()=>{
    if(getCookie('refreshToken')){
        
        console.log(userInfo)
        if(!userInfo.garden_name){
            if(userInfo.city===gardenDetailInfo.SG_NM){
                    console.log(gardenDetailInfo)
                    setPopUpOpen(true)
                
                
                
            }else{
                console.log(userInfo.city)
                console.log(gardenDetailInfo.SG_NM)
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

/* 페이징에 필요한 코드 */
const [postsLenth,setPostsLength]=useState(0);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage=3;
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;

function currentPosts(tmp) {
  let currentPosts = [];
  if(tmp){
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  return currentPosts;
}
var garden_nm='';
const [pagenm,setPageNm]=useState(true)
const getGardenNM=(text)=>{
    
    garden_nm=text;

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
            if(!gardenInfo.findGardenDetailInfo[i].REFINE_WGS84_LOGT){
                findLogtLat.refetch(FINDLOGTLAT,{variables:{address:gardenInfo.findGardenDetailInfo[i].REFINE_LOTNO_ADDR}}).then((res)=>{
                    if(res.data.findLogtLat){
                        setGardenDetailInfo(prev=>({
                            ...prev,
                            REFINE_WGS84_LOGT:res.data.findLogtLat[0],
                            REFINE_WGS84_LAT:res.data.findLogtLat[1],
                        }))  
                    }

                    
                }).catch((err)=>{
                    console.log(err)
                    setGardenDetailInfo(prev=>({
                        ...prev,
                        REFINE_WGS84_LOGT:null,
                        REFINE_WGS84_LAT:null,
                    }))  
                })
            }
        }
    }
    
}
useEffect(()=>{
    if(detailInfo)
        setPageNm(pagenm=>!pagenm)
},[detailInfo])

    return(
        <div>
            <HeaderStyledContainer garden_location_fontweight state={state.id}>
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
                        <div className="item__nmlist">
                        {gardenNmInfo.findGardenSGNM && gardenNmInfo.findGardenSGNM.map((sg,index)=><li key={index} className="item__nmlist__content" onClick={onHandleSGNM}>{sg}</li>)}
                        </div>
                    </div>

                    <div className='item__info'>
                        <Posts posts={currentPosts(gardenInfo.findGardenDetailInfo)} loading={loading} getGardenNM={getGardenNM}></Posts>
                        <Pagination postsPerPage={postsPerPage} totalPosts={postsLenth} paginate={setCurrentPage} pagenm={pagenm}></Pagination>
                    </div>

                    <div className='item__map' style={{visibility:gardenDetailInfo.KITGDN_NM?"visible":"hidden"}}>
                       <Location address={gardenDetailInfo.REFINE_LOTNO_ADDR} logt={gardenDetailInfo.REFINE_WGS84_LOGT} lat={gardenDetailInfo.REFINE_WGS84_LAT}/>
                        <br/>
                        텃밭 이름 : {gardenDetailInfo.KITGDN_NM}
                        <br/>
                        {gardenDetailInfo.LOTOUT_PC_CONT? <>분양 가격 : {gardenDetailInfo.LOTOUT_PC_CONT}</>:
                        <>분양 가격 : 데이터가 존재 하지 않습니다.</>}
                       
                        <br/>
                        <button onClick={openPopUp} className="registBtn">신청하기</button>
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