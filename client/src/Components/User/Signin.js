import { useMutation} from '@apollo/client'
import React, { useState } from 'react'
import { SigninStyleContainer } from '../../css/SigninStyleContainer'
import {SIGNIN} from '../../Database/Graphql'
import {getCookie, getRefreshCookie, setCookie, setRefreshCookie} from '../Auth/Cookis'


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
    const [signin,{data,loading,error}]=useMutation(SIGNIN,{errorPolicy:'all'})
    const [errors,setErrors]=useState([''])
    const onHandleLogin=async()=>{
        // signin({variables:{id:loginInfo.id,password:loginInfo.password}}).then((res)=>{
        //    console.log(res.data.signin)
        //     if(res.data.signin!==null){               
        //         console.log(res.data.signin[0])
        //         var test=res.data.signin[0];
        //         setCookie('accessToken',test,{
        //             path:"/",
        //         })
        //         // setRefreshCookie('refreshToken',res.data.signin[1],{
        //         //     path:"/",
        //         // })
        //         history.push('/')
        //     }else{
        //         console.log("fail")
        //     }
        // }).catch((error)=>{
        //     console.log(error.message)
        // })
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