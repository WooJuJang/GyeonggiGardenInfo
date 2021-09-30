import Styled from '@emotion/styled'

export const RegistPopUpStyledContainer=Styled.div`
    .RegistPopUp{
        box-sizing:border-box;
        display:block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.6);
        outline: 0;
    }
    .RegistPopUp > section {
        width: 25%;
        height:80%;
        max-width: 450px;
        margin:auto;
        border-radius: 4em;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: auto;
        z-index:1000;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color:#F5ECD9;
        display:flex;
        flex-direction:column;
        text-align:left;
    }
    .innerForm{
        
        padding-top:10%;
    
    }
    .innerForm > header{
        position:absolute;
        top:5%;
        right:5%;

    }
    .main{
        padding-left:8%;
        width:100%;
        
        margin-bottom:20%;
       
    }
    .registBtn{
        background-color:#8CCB65;
        &:hover{
            cursor:pointer;
        }
    }
    .kitgdn_nm{
        display:inline-block;
        font-weight:bold;
        letter-spacing:.2em;
        margin-bottom:10%;
    }
    .main>.main_content{
        display:inline-block;
        margin-bottom:5%;
    }
    .exit-btn{
        background-color:transparent;
        outline:none;
        border:none;
        &:hover{
            cursor:pointer;
        }
    }
`