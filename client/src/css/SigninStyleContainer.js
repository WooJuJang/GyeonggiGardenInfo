import Styled from '@emotion/styled'

export const SigninStyleContainer=Styled.div`
.signin-full-form{
    width:100%;
    height:100vh;
    background-color:#DEDEDE;
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

export const SignupStyleContainer=Styled.div`
.signup-full-form{
    width:100%;
    height:100vh;
    background-color:#DEDEDE;
}
.signup-form{
    position:absolute;
    width:30%;
    height:60%;
    left:35%;
    top:20%;
    bottom:0;
    right:0;
    display:flex;
    flex-direction: column;
}
.signup-label{
    font-family:Roboto;
    font-style:normal;
    font-weight:bold;
    font-size:48px;
    margin-bottom:10px;
}
.input-label{
    font-family:Roboto;
    font-style:normal;
    font-weight:bold;
    font-size:15px;
    margin-top:10px;  
    margin-bottom:3px;         
}
.id-input{
    height:30px;
}
.pw-input{
    height:30px;
}
.city-input{
    height:30px;
}
.signup-btn{
    margin-top:10px;
    width:50%;
    height:30px;
    background:#8CCB65;
    margin-left:24%;
}
`