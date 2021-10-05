import { useQuery } from '@apollo/client'
import React, { useEffect, useState ,useContext} from 'react'
import { UserInfoStyledContainer } from '../../css/User/UserInfoStyledContainer'
import { FINDUSER } from '../../Database/Graphql'
import {UserInfoContext} from '../Common/UserInfoContext'

const UserInfo = ({ history }) => {
    
    const {state}=useContext(UserInfoContext)
    if(state.id===''){
        history.push('/signin');
    }
    const findUserInfo = useQuery(FINDUSER,{ errorPolicy: "all" })
    
    const [userInfo, setUserInfo] = useState({
        id: '',
        city: '',
        garden_name: '',
    })
    if (userInfo.id === '') {
        findUserInfo.refetch(FINDUSER)
    }
    useEffect(() => {
        if (findUserInfo.loading === false && findUserInfo.data?.findUser?.id) {
            setUserInfo({
                id: findUserInfo.data.findUser.id,
                city: findUserInfo.data.findUser.city,
                garden_name: findUserInfo.data.findUser.garden_name
            })

        }
        
    }, [findUserInfo])
    const moveMain = () => {
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
                    <label className='info-item'>{userInfo.garden_name}</label>

                    <button className='btn' onClick={moveMain}>OK</button>
                </div>
            </div>
        </div>
        </UserInfoStyledContainer>

    )
}
export default UserInfo