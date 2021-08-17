import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UserInfoStyledContainer } from '../css/UserInfoStyledContainer'
import { FINDUSER } from '../Database/Graphql'

const UserInfo=({history})=>{
    const findUserInfo=useQuery(FINDUSER)
    const [userInfo,setUserInfo]=useState({
        id:'',
        city:''
    })
    if(userInfo.id==null){
        findUserInfo.refetch(FINDUSER)
    }
    useEffect(()=>{
        if(findUserInfo.loading ==false && findUserInfo.data){
        setUserInfo({        
            id:findUserInfo.data.findUser.id,
            city:findUserInfo.data.findUser.city
        })
    }
    },[findUserInfo])
    const moveMain=()=>{
        history.goBack()
    }
    return (
        
        <UserInfoStyledContainer>
            <div className='userinfo-form'>
                <div className='userinfo-form-box'>
                    <div className='userinfo-form-box-grid'>
                    <label className='item1'>사용자 정보</label>
                    
                    
                    <label className='item'>사용자 아이디 </label>
                    <label className='info-item'>{userInfo.id}</label>
                
                    <label className='item'>사용자 지역 </label>
                    <label className='info-item'>{userInfo.city}</label>
                    
                    <label className='item'>신청 텃밭</label>    
                    <label className='info-item'></label>

                    <button className='btn' onClick={moveMain}>OK</button>
                    </div>
                </div>
            </div>
        </UserInfoStyledContainer>
      
    )
}
export default UserInfo