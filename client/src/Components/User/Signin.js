import { useMutation} from '@apollo/client'
import React, { useContext, useState } from 'react'
import { SigninStyleContainer } from '../../css/SigninStyleContainer'
import {SIGNIN} from '../../Database/Graphql'
import {setCookie} from '../Auth/Cookis'
import {UserInfoContext} from '../../UserInfoContext'
import { TimerContext } from '../Common/Timer'

const Login=({history})=>{
   
    const contextValue=useContext(UserInfoContext)
    const timer=useContext(TimerContext)


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
    const [signin,{error}]=useMutation(SIGNIN,{errorPolicy:'all', onCompleted:  (data) => {     
        setCookie('refreshToken',data.signin,{
                    path:"/",
                })
                contextValue.dispatch({type:'INSERT_USER',id:loginInfo.id})
                
    }})
    const OnHandleLogin=async()=>{

            const login_data=await signin({variables:{id:loginInfo.id,password:loginInfo.password}})
            timer.timerdispatch({type:'TIMER_START'})
            if(!login_data.errors){
                history.push('/')
            }
    }



        return(
            <div>
            <SigninStyleContainer>
            
            <div className='signin-full-form'>
            <div className='signin-form'>
                <div className='contents-form'>

                    <label className='signin'>SignIn</label>
                    <input className='id' name='id' value={loginInfo.id} onChange={onChangeLoginInfo} placeholder='아이디를 입력하세요' required autoComplete="off"></input>
                    <input type="password" className='pw' name='password' value={loginInfo.password} onChange={onChangeLoginInfo} placeholder='패스워드를 입력하세요' required autoComplete="new-password"></input>
                    </div>
                    {error?<div>{error.message}</div>:<></>}
                    <div className='btn-form'>

                    <button className='signin-btn' onClick={OnHandleLogin}>SignIn</button>
                    <button className='signup-btn' onClick={moveSignup}>SignUp</button>
                    </div>
                </div>
            </div>

    </SigninStyleContainer>

    </div>
        )
}

export default Login