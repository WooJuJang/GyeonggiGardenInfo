import React, { useState } from 'react'
import {SIGNUP} from '../../Database/Graphql'
import {useQuery,useMutation} from '@apollo/react-hooks'
import {SignupStyleContainer} from '../../css/SigninStyleContainer'

function Signup({history}){

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
    const [singup,{data,loading,error}]=useMutation(SIGNUP)
    
    const onHandleSubmit=async(e)=>{
        e.preventDefault();
        console.log(userInfo.id);
        singup({variables:{id:userInfo.id,password:userInfo.password,city:userInfo.city}}).then((res)=>{
            if(res.data.signup===null){
                return (
                    alert('The Same Id already exits :(')
                )
            }else{
                history.push('/signin')
            }
        });
        
        
    }
    return(
        <div>
            <SignupStyleContainer>
                <form>
                    <div className='signup-full-form'>
                        <div className='signup-form'>
                            <label className='signup-label'>SignUp</label>
                            <label className='input-label' >ID</label>
                            <input type='text' className='id-input' name='id' value={userInfo.id} onChange={onChangeUserInfo} placeholder='아이디를 입력하세요'/>
                            <label className='input-label' >PassWord</label>
                            <input type='text' className='pw-input' name='password' value={userInfo.password} onChange={onChangeUserInfo} placeholder='패스워드를 입력하세요'></input>
                            <label className='input-label'>City</label>
                            <input type='text' className='city-input'name='city' value={userInfo.city} onChange={onChangeUserInfo} placeholder='거주지역을 입력하세요'></input>
                            <button className='signup-btn'onClick={onHandleSubmit}>SignUp</button>
                        </div>
                    </div>
                </form>
            </SignupStyleContainer>
        </div>
    )
}
export default Signup