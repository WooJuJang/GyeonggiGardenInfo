import React from 'react';

const TokenExpiredPopUp=(props)=>{
    const {open,close}=props
   console.log(open)
   console.log(close)
   
return(
    <div>
        {open?
            <div>
                <button onClick={close}>&times;</button>
                <label>토큰이 만료되어 자동 로그아웃 됩니다.</label>
            </div>
        :<div>token invliade</div>}
        
    </div>
    )
}
export default TokenExpiredPopUp