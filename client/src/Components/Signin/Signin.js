import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { SigninStyleContainer } from '../../css/SigninStyleContainer'
import {SIGNIN} from '../../Database/Graphql'

const Login=({history})=>{
    const moveSignup=()=>{
        history.push("/signup")
    }
    const [loginInfo,setLoginInfo]=useState({
        id:'',
        password:'',
    })
    const onChangeLoginInfo=(e)=>{
        if(e.target.name==='id'){
            return setLoginInfo(loginInfo=>({...loginInfo,id:e.target.value}))
        }else{
            return setLoginInfo(loginInfo=>({...loginInfo,password:e.target.value}))
        }
    }
    const [signin,{data,loading,err}]=useMutation(SIGNIN)
    const onHandleLogin=async()=>{
        signin({variables:{id:loginInfo.id,password:loginInfo.password,exist:false}}).then((res)=>{
            if(res.data.signin===true){
                history.push("/")
            }else{
                console.log("fail")
                alert('Check your Id or PassWord :(')
            }
        })
      
    }
        return(
            <div>
            <SigninStyleContainer>
                
            <div className='signin-full-form'>
            <div className='signin-form'>
                <div className='contents-form'>
                    <label className='signin'>SignIn</label>
                    <input className='id' name='id' value={loginInfo.id} onChange={onChangeLoginInfo} placeholder='아이디를 입력하세요' required></input>
                    <input className='pw' name='password' value={loginInfo.password} onChange={onChangeLoginInfo} placeholder='패스워드를 입력하세요' required></input>
                    </div>
                    <div className='btn-form'>
                    <button className='signin-btn' onClick={onHandleLogin}>SignIn</button>
                    <button className='signup-btn' onClick={moveSignup}>SignUp</button>
                    </div>
                </div>
            </div>
        
    </SigninStyleContainer>
    </div>
        )

}

export default Login