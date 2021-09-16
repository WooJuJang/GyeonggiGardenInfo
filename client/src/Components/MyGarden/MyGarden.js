import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { HeaderStyledContainer } from '../../css/HeaderStyledContainer';
import { UserInfoContext } from '../../UserInfoContext';
import {Header} from '../Common/Header'
const MyGarden=()=>{
    let history=useHistory();
    const {state}=useContext(UserInfoContext)
    return(
        <HeaderStyledContainer my_garden state={state.id}>
        <Header history={history}/>
        </HeaderStyledContainer>
    )
}

export default MyGarden