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
    font-weight:bold;
}
.MoveGardenLocation{
    font-weight:${props=>props.garden_location_fontweight? 'bold' : ''};
    color:${props=>props.main?'white':'black'};
}
.MoveCropRecommend{
    font-weight:${props=>props.crop_recommend_fontweight? 'bold':''};
    color:${props=>props.main?'white':'black'};
}
.MoveMyGarden{
    font-weight:${props=>props.my_garden?'bold':''};
    color:${props=>props.main?props.state?
        'white'
        :'gray':
        props.state?
        'black'
        :'gray'}
}
.MoveGardenCalendar{
    font-weight:${props=>props.garden_calendar?'bold':''};
    color:${props=>props.main?props.state?
        'white'
        :'gray':
        props.state?
        'black'
        :'gray'}
}
`