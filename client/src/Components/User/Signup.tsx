import React, { ChangeEvent, useState } from 'react'
import { SIGNUP } from '../../Database/Graphql'
import { useMutation } from '@apollo/react-hooks'
import { SignupStyleContainer } from '../../css/User/SigninStyleContainer'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory();
    type userInfoType={
        id:string,
        password:string,
        city:string,
    }
    const [userInfo, setUserInfo] = useState<userInfoType>({
        id: '',
        password: '',
        city: '',
    })

    interface signupData{
        signup:userInfoType
    }
    const [singup] = useMutation<signupData,{id:string,password:string,city:string}>(SIGNUP)

    //회원가입 input작업
    const onChangeUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "id") {
            return setUserInfo(userInfo => ({ ...userInfo, id: e.target.value }))
        } else if (e.target.name === "password") {
            return setUserInfo(userInfo => ({ ...userInfo, password: e.target.value }))
        } else {
            return setUserInfo(userInfo => ({ ...userInfo, city: e.target.value }))
        }
    }

    //회원가입 작업
    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        singup({ variables: { id: userInfo.id, password: userInfo.password, city: userInfo.city } }).then((res) => {
            if(res.data){
                if (res.data.signup === null) {
                    return (
                        alert('The Same Id already exits :(')
                    )
                } else {
                    history.push('/signin')
                }
            }
        });
    }

    return (
        <div>
            <SignupStyleContainer>
                <form onSubmit={(e) => onHandleSubmit(e)}>
                    <div className='signup-full-form'>
                        <div className='signup-form'>
                            <label className='signup-label'>SignUp</label>
                            <label className='input-label' >ID</label>
                            <input type='text' className='id-input' name='id' value={userInfo.id} onChange={onChangeUserInfo} placeholder='아이디를 입력하세요' />
                            <label className='input-label' >PassWord</label>
                            <input type='text' className='pw-input' name='password' value={userInfo.password} onChange={onChangeUserInfo} placeholder='패스워드를 입력하세요'></input>
                            <label className='input-label'>City</label>
                            <input type='text' className='city-input' name='city' value={userInfo.city} onChange={onChangeUserInfo} placeholder='거주지역을 입력하세요'></input>
                            <button type="submit" className='signup-btn'>SignUp</button>
                        </div>
                    </div>
                </form>
            </SignupStyleContainer>
        </div>
    )
}
export default Signup