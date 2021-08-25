import React from 'react'
import { TokenErrorStyledContainer } from '../../css/Error/TokenErrorStyledContainer'
const TokenError =() =>{
 return(
     <TokenErrorStyledContainer>
     <div className="errorForm">
            <p className="errorName">Token Error!</p>

            <label className="errorExplanation">Please try logging in again or ask site administrator</label>
           <br/>
            <label className="email">wooju.jang@vatech.com</label>
     </div>
     </TokenErrorStyledContainer>
 )
}
export default TokenError