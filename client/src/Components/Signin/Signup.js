import React, { useState } from 'react'
import Styled from '@emotion/styled'
import {SIGNUP} from '../../Database/Graphql'
import {useQuery,useMutation} from '@apollo/react-hooks'


function Signup(){
    const SignupStyleContainer=Styled.div`
        body{
            width:100%;
            height:100vh;
            margin:0 auto;
        }
        .signup-form{
            position:absolute;
            width:30%;
            height:60%;
            left:35%;
            top:20%;
            bottom:0;
            right:0;
            display:flex;
            background:white;
            flex-direction: column;
        }
        .signup-label{
            font-family:Roboto;
            font-style:normal;
            font-weight:bold;
            font-size:48px;
            margin-bottom:10px;
        }
        .input-label{
            font-family:Roboto;
            font-style:normal;
            font-weight:bold;
            font-size:15px;
            margin-top:10px;  
            margin-bottom:3px;         
        }
        .id-input{
            height:30px;
        }
        .pw-input{
            height:30px;
        }
        .city-input{
            height:30px;
        }
        .signup-btn{
            margin-top:10px;
            width:50%;
            height:30px;
            background:#8CCB65;
            margin-left:24%;
        }
    `
    const [userInfo,setUserInfo]=useState({
        id:'',
        password:'',
        city:'',
    })
    const onChangeUserInfo=(e)=>{
        if(e.target.name==="id"){
            return setUserInfo(userInfo=>({...userInfo,id:e.target.value}))
        }else if(e.target.name==="password"){
            return setUserInfo(userInfo=>({...userInfo,password:e.target.value}))
        }else{
            return setUserInfo(userInfo=>({...userInfo,city:e.target.value}))
        }
    }
    const signup=useMutation(SIGNUP,{variables:{id:userInfo.id,password:userInfo.password,city:userInfo.city}})
    
    return(
        <div>
            <SignupStyleContainer>
                <div className='signup-form'>
                    <label className='signup-label'>SignUp</label>
                    <label className='input-label' >ID</label>
                    <input type='text' className='id-input' name='id' value={userInfo.id} onChange={onChangeUserInfo} placeholder='아이디를 입력하세요'/>
                    <label className='input-label' >PassWord</label>
                    <input type='text' className='pw-input' name='password' value={userInfo.password} onChange={onChangeUserInfo} placeholder='패스워드를 입력하세요'></input>
                    <label className='input-label'>City</label>
                    <input type='text' className='city-input'name='city' value={userInfo.city} onChange={onChangeUserInfo} placeholder='거주지역을 입력하세요'></input>
                    <button className='signup-btn'>SignUp</button>
                </div>
            </SignupStyleContainer>
        </div>
    )
}
export default Signup