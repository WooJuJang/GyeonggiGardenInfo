import { useMutation} from '@apollo/client'
import React, { useContext, useState } from 'react'
import { SigninStyleContainer } from '../../css/SigninStyleContainer'
import {SIGNIN} from '../../Database/Graphql'
import {setCookie} from '../Auth/Cookis'
import {UserInfoContext} from '../../UserInfoContext'

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
    const [signin,{error}]=useMutation(SIGNIN,{errorPolicy:'all'})
    const contextValue=useContext(UserInfoContext)
    
    const OnHandleLogin=async()=>{
        
        let tokens;
        try{
            tokens=await signin({variables:{id:loginInfo.id,password:loginInfo.password}})
            if(tokens.data){
                console.log(tokens)
                await setCookie('accessToken',tokens.data.signin[0],{
                    path:"/",
                })
                await setCookie('refreshToken',tokens.data.signin[1],{
                    path:"/",
                })
                contextValue.actions.setUserInfo(loginInfo.id)
                history.push('/')
            }
        }catch(err){
            console.log(err.message)
        }
        
        return tokens;
        
    
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