import Styled from '@emotion/styled'

export const MainStyledContainer=Styled.div`
    .main-form{
        background-image: url(/images/mainimage.jpeg);
        background-repeat:no-repeat;
        background-position:center;
       
        width:100%;
        height:100vh;
        background-size:cover;
        
    }
    .blackbox{
        width:100%;
        height:100vh;
        background-color:black;
        opacity:0.8;
    }
    .main-text-form{
        font-size:2.7em;
        font-weight:bold;
        color:white;
        margin-left:27%;
        margin-top:20%;
    }
    .header-form{
        width:100%;
        color:white;
        text-align:center;
        padding-top:3%;
    }
    .menu{
        
        display:inline-block;
        float:center;
        padding-left:8%;
        
    }
    .btn{
        width:10%; 
        display:inline-block;
        float:right;
    }
`