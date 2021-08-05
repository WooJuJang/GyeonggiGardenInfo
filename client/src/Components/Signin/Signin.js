import React from 'react'
import Styled from '@emotion/styled'

const Login=({history})=>{
    const moveSignup=()=>{
        history.push("/signup")
    }
    const SigninStyleContainer=Styled.div`
        body{
            width:100%;
            height:100vh;
            margin:0 auto;
            background:gray;
        }
        .signin-form{
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
        .contents-form{
            width:100%;
            display: flex;
            flex-direction: column;
        }
        .btn-form{
            width:100%;
            display: flex;
            flex-direction: row;
           
        }
        .signin{
            font-family:Roboto;
            font-style:normal;
            font-weight:bold;
            font-size:48px;
            margin-bottom:10px;
        }
        .id{
            margin-bottom:6px;
            height:30px;
        }
        .pw{
            margin-bottom:6px;
            height:30px;
        }
        .signin-btn{
            width:50%;
            margin-right:3px;
            height:30px;
            background:#8CCB65;
        }
        .signup-btn{
            width:50%;
            margin-left:3px;
            height:30px;
            background:#8CCB65;
        }
        

    `
    return (
        <SigninStyleContainer>
        <div className='signin-form'>
            <div className='contents-form'>
                <label className='signin'>SignIn</label>
                <input className='id' placeholder='아이디를 입력하세요'></input>
                <input className='pw' placeholder='패스워드를 입력하세요'></input>
                </div>
                <div className='btn-form'>
                <button className='signin-btn'>SignIn</button>
                <button className='signup-btn' onClick={moveSignup}>SignUp</button>
                </div>
        </div>
        </SigninStyleContainer>
    )
}

export default Login