import Styled from '@emotion/styled'

export const HeaderStyledContainer=Styled.div`
.header-form{
    width:100%;
    text-align:center;
    padding-top:3%;
}
.menu{
    display:inline-block;
    float:center;
    padding-left:8%;
}
label{
    &:hover{
        cursor:pointer;
    }
}
button{
    &:hover{
        cursor:pointer;
    }
}
.btn{
    width:10%; 
    display:inline-block;
    float:right;
}
.MoveGardenLocation{
    font-weight:${props=>props.garden_location_fontweight? 'bold' : ''};
}
.MoveCropRecommend{
    font-weight:${props=>props.crop_recommend_fontweight? 'bold':''};
}
.MoveMyGarden{
    font-weight:${props=>props.my_garden?'bold':''};
}
.MoveGardenCalendar{
    font-weight:${props=>props.garden_calendar?'bold':''};
}
`