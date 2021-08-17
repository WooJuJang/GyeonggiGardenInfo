import Styled from '@emotion/styled'

export const UserInfoStyledContainer=Styled.div`
.userinfo-form{
    width:100%;
    height:100vh;
    background-color:#DEDEDE;
}
.userinfo-form-box{
    position:absolute;
    left:30%;
    top:15%;
    width:40%;
    height:50%;
    background-color:white;
    border-radius:20%

}
.userinfo-form-box-grid{
    padding-top:10%;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
}
.item1{
    grid-column:1/-1;
    text-align:center;
    font:2em bold;
}
.item{
    color:gray !important;
    padding-left:40%
}
.info-item{
    padding-left:10%
}
.btn{
    grid-column:1/-1;
    width:40%;
    margin:auto;
    text-align:center;
    margin-top:20%;
}
`