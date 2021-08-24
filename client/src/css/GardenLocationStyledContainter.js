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
        grid-template-columns:1.1fr 1fr 1.1fr;
       
        text-align:center;


    }
.item{
  
    &__input{
        margin:auto;
        width:90%;
        height:80%;
        text-align:left;
        padding-left:20%;
        
    }
    &__info{
        margin:auto;
        width:100%;
        height:80%;
        border:solid 0.3em;
        text-align:left;
        border-color:white gray white gray;
    }
    &__map{
        margin:auto;
        width:90%;
        height:80%;
        text-align:left;
        

    }
    &__nmlist{
        margin-top:10%;
        &__content{
            margin-top:3%;
        }
    }
}
.registBtn{
    margin-top:8%;
    margin-left:40%;
   
}
.garden_info{
    padding-bottom:10%;
    
}
.garden_nm{
    font-weight:bold;
}
.garden_address{
    font-size:13px;
}
`
