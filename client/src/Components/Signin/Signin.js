import { useMutation, useQuery } from '@apollo/client'
import axios from 'axios'
import React, { useState,useEffect,useContext } from 'react'
import { SigninStyleContainer } from '../../css/SigninStyleContainer'
import {SIGNIN} from '../../Database/Graphql'
import {Authcontext, AuthProvider} from '../Auth/GlobalStates'
import {setCookies,getcookies} from '../Auth/Auth' 
import decode_jwt from 'jwt-decode'
import { Cookies, useCookies } from 'react-cookie';
import {setCookie} from '../Auth/Cookis'

const apiUrl='http://localhost:4000';

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
        signin({variables:{id:loginInfo.id,password:loginInfo.password}}).then((res)=>{        
            if(res.data.signin!==null){               
                console.log(res)
               
                setCookie('token',res.data.signin,{
                    path:"/",
                })

                history.push('/')
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