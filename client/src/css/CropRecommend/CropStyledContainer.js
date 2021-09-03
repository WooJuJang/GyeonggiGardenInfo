import Styled from '@emotion/styled'

export const CropStyledContainer=Styled.div`

    .main-form{
        display:flex;
        flex-direction:row;
        justify-content: center;
        margin-top:10%;

    }
    .crop-img-form{
        width:20%;
        
    }
    .crop-img{
        background-image: url(${props=>{
            return props?.image ? props.image : "/images/tomato.jpeg"
        }});
        background-repeat:no-repeat;
        background-position:center;  
        width:100%;
        height:100%;
    }
    .crop-info{
        width:50%;
        margin-left:2%;
    }
    .crop-name-list{
        color:gray;
    }
    .crop-name{
        font-size:25px;
        margin-top:5%;
        width:40%;
        border-bottom:0.1rem solid;
    }
    .crop-detail{
        margin-top:2%;
    }
    .${props=>props.crop}{
        color:black;
    }

`
