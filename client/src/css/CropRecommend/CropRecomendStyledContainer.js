import Styled from '@emotion/styled'

export const CropReccomendStyledContainer =Styled.div`
    .main{
        display:flex;
        flex-direction:row;
        width:100%;
        height:60vh;
        margin-top:7%;
        justify-content:center;
        align-items:center;
        font-size:25px;
        font-weight:bold;
    }
    .spring{
        background-image: url(/images/spring.jpeg);
        background-repeat:no-repeat;
        background-position:center;  
        height:100%;
        width:25%;
        color:white;
        filter:grayscale(100%);
        text-align:center;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .spring:hover{
        filter:grayscale(0%);
    }
    .spring-text{
        visibility:hidden;
    }
    .spring:hover .spring-text{
       visibility:visible;
    }
    .summer{
        background-image: url(/images/summer.jpeg);
        background-repeat:no-repeat;
        background-position:center;  
        height:100%;
        width:25%;
        color:white;
        filter:grayscale(100%);
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .summer:hover{
        filter:grayscale(0%);
    }
    .summer-text{
        visibility:hidden;
    }
    .summer:hover .summer-text{
        visibility:visible;
    }
    .fall{
        background-image: url(/images/fall.jpeg);
        background-repeat:no-repeat;
        background-position:center;  
        height:100%;
        width:25%;
        color:white;
        filter:grayscale(100%);
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .fall:hover{
        filter:grayscale(0%);
    }
    .fall-text{
        visibility:hidden;
    }
    .fall:hover .fall-text{
        visibility:visible;
    }
`