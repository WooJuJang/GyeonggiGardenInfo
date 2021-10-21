import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SigninStyleContainer } from '../../css/User/SigninStyleContainer'
import { SIGNIN } from '../../Database/Graphql'
import { setCookie } from '../Auth/Cookis'
import { useDispatchContext } from '../Common/UserInfoContext'
import { useHistory } from 'react-router-dom'
import type {loginInfoType,signinData} from './UserType'
const Login = () => {
    const history = useHistory();
    const dispatch = useDispatchContext();
    const fulldaytime: number = 60 * 60;

    const [loginInfo, setLoginInfo] = useState<loginInfoType>({
        id: '',
        password: '',
    })

    const [signin, { error }] = useMutation<signinData,{id:string,password:string}>(SIGNIN, {
        errorPolicy: 'all', onCompleted: (data) => {
            setCookie('refreshToken', data.signin, {
                path: "/",
            })
            dispatch({ type: 'INSERT_USER', id: loginInfo.id })

        }
    })

    //로그인 input작업
    const onChangeLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'id') {
            return setLoginInfo(loginInfo => ({ ...loginInfo, id: e.target.value }))
        } else {
            return setLoginInfo(loginInfo => ({ ...loginInfo, password: e.target.value }))
        }
    }
    //로그인 작업
    const onHandleLogin = async () => {
        setCookie('timer', fulldaytime)
        const login_data = await signin({ variables: { id: loginInfo.id, password: loginInfo.password } })
        if (!login_data.errors) {
            history.push('/')
        }
    }
    //회원가입창으로 이동
    const moveSignup = () => {
        history.push("/signup")
    }


    return (
        <div>
            <SigninStyleContainer>

                <div className='signin-full-form'>
                    <div className='signin-form'>
                        <div className='contents-form'>

                            <label className='signin'>SignIn</label>
                            <input className='id' name='id' value={loginInfo.id} onChange={onChangeLoginInfo} placeholder='아이디를 입력하세요' required autoComplete="off"></input>
                            <input type="password" className='pw' name='password' value={loginInfo.password} onChange={onChangeLoginInfo} placeholder='패스워드를 입력하세요' required autoComplete="new-password"></input>
                        </div>
                        {error ? <div>{error.message}</div> : <></>}
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