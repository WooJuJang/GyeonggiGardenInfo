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
    .main-text-form{
        font-size:2.7em;
        font-weight:bold;
        color:white;
        margin-left:16%;
        margin-top:20%;
    }
    .text{
        position:relative;
        display: inline-block;
        height: 50px; 
        overflow: hidden;
        white-space:nowrap;
        letter-spacing:0.15em;
        border-right:0.15em solid orange;
        animation: 
        typingAni 5s steps(50,end),
        cursor 0.5s step-end infinite;
    }
    @keyframes typingAni {
        0%{width:0}
        100%{width: 89%;}
      }
    @keyframes cursor{
        0%{border-color:transparent;}
        50%{border-color:orange;}
        100%{border-color:transparent;}
    }
`