import React,{useContext} from 'react'
import {removeCookie} from '../Auth/Cookis'
import {useMutation} from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { TokenErrorStyledContainer } from '../../css/Error/TokenErrorStyledContainer'
import {UserInfoContext} from '../Common/UserInfoContext'
import {LOGOUT} from "../../Database/Graphql"
//토큰 유효기간만료 혹은 에러 페이지
const TokenError =() =>{
    const history=useHistory();
    const {state,dispatch}=useContext(UserInfoContext);
    const [removeRefreshToken]=useMutation(LOGOUT,{variables:{id:state.id}})

    const logout=(route)=>{
        removeCookie('refreshToken')
        removeRefreshToken(LOGOUT,{variables:{id:state.id}})
        dispatch({type:'REMOVE_USER'})
        history.push(route)
    }
 return(
     <TokenErrorStyledContainer>
     <div className="errorForm">
            <p className="errorName">Token Error!</p>

            <label className="errorExplanation">Please try logging in again or ask site administrator</label>
           <br/>
            <label className="email">wooju.jang@vatech.com</label>
            <br/>
            <div className="btn-form">
                <button onClick={()=>logout('/')}>Go Main</button>
                <button onClick={()=>logout('/signin')}>SignIn</button>
            </div>
     </div>
     </TokenErrorStyledContainer>
 )
}
export default TokenError