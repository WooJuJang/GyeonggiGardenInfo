import React from 'react'
import { removeCookie } from '../Auth/Cookis'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { TokenErrorStyledContainer } from '../../css/Error/TokenErrorStyledContainer'
import { useStateContext, useDispatchContext } from '../Common/UserInfoContext'
import { LOGOUT } from "../../Database/Graphql"

//토큰 유효기간만료 혹은 에러 페이지
const TokenError = () => {
    const history = useHistory();

    //사용자정보 컨텍스트
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const [removeRefreshToken] = useMutation<boolean,{id:String}>(LOGOUT, { variables: { id: state.id } })

    //로그아웃 기능
    const logout = (route: string):void => {
        removeCookie('refreshToken')
        removeRefreshToken()
        dispatch({ type: 'REMOVE_USER' })
        history.push(route)
    }
    return (
        <TokenErrorStyledContainer>
            <div className="errorForm">
                <p className="errorName">Token Error!</p>

                <label className="errorExplanation">Please try logging in again or ask site administrator</label>
                <br />
                <label className="email">wooju.jang@vatech.com</label>
                <br />
                <div className="btn-form">
                    <button onClick={() => logout('/')}>Go Main</button>
                    <button onClick={() => logout('/signin')}>SignIn</button>
                </div>
            </div>
        </TokenErrorStyledContainer>
    )
}
export default TokenError