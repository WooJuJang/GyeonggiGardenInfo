import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UserInfoStyledContainer } from '../../css/User/UserInfoStyledContainer'
import { FINDUSER } from '../../Database/Graphql'
import { useHistory } from 'react-router-dom'

const UserInfo = () => {
    const history = useHistory();
    type userInfoType={
        id:string,
        city:string,
        garden_name:string
    }
    const [userInfo, setUserInfo] = useState<userInfoType>({
        id: '',
        city: '',
        garden_name: '',
    })
    interface userInfoData{
        findUser:userInfoType
    }
    const findUserInfo = useQuery<userInfoData>(FINDUSER, { errorPolicy: "all" })


    useEffect(() => {
        if (userInfo.id === '') {
            findUserInfo.refetch(FINDUSER)
        }
        if (findUserInfo.loading === false && findUserInfo.data?.findUser?.id) {
            setUserInfo({
                id: findUserInfo.data.findUser.id,
                city: findUserInfo.data.findUser.city,
                garden_name: findUserInfo.data.findUser.garden_name
            })
        }
    }, [findUserInfo, userInfo.id])

    //이전페이지로 이동
    const moveBack = () => {
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

                        <button className='btn' onClick={moveBack}>OK</button>
                    </div>
                </div>
            </div>
        </UserInfoStyledContainer>

    )
}
export default UserInfo