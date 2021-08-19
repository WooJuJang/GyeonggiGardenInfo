import Styled from '@emotion/styled'

export const GardenLocationStyledContainter=Styled.div`
    .main-form{
        background-image:url(/images/green_crop.jpeg);
        background-repeat:no-repeat;
        background-position:center;
        margin-top:6%;
        width:100%;
        height:65vh;
        background-size:cover;
        filter:grayscale(30%);
       display:flex;
       
        
    }
    .sub-form{
        background-color:white;
        width:90%;
        height:75%;
        margin:auto;
        border-radius:50px;
        display:grid;
        grid-template-columns:1.2fr 1fr 1.2fr;
       
        text-align:center;

    }
.item{
   
    &__input{
        margin:auto;
        width:90%;
        height:80%;
        background-color:pink;
        
    }
    &__info{
        margin:auto;
        width:100%;
        height:80%;
        background-color:pink;
        border:solid 0.3em;
        border-color:white gray white gray;
    }
    &__map{
        margin:auto;
        width:90%;
        height:80%;
        background-color:pink;

    }
}

`
