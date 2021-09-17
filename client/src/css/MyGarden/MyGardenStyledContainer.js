import Styled from '@emotion/styled'

export const MyGardenStyledContainer=Styled.div`
    .forecast-form{
        margin-top:7%;
        display:grid;
        grid-template-columns:repeat(4 , 1fr);
        justify-items:center;
    }
    .forecast-first{
        display:grid;
        grid-template-columns:1fr 1fr;
    }
    .forecast-first-sub2{
        color:gray;
        font-size:13px;
    }
    .forecast-second{
        text-align:right;
    }
    .refresh-label{
        font-size:13px;
        margin-bottom:1px;
    }
    .refresh-btn{
        border:none;
        outline:none;
        background-color:white;
        margin-bottom:1px;
        &:hover{
            cursor:pointer;
        }
    }
    .refresh-img{
        background-color:white;
        width:15px;
        height:15px;
    }
    .temp{
        font-size:30px;
    }
`;