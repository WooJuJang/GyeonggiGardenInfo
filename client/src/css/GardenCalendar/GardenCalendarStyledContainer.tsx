import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled"

type calendar={
    plantlist?:string
    managementlist?:string
    harvestlist?:string
    removelist?:string
}

const test='2021-08-16';
const tagtest='[data-date=\''+test+'\']{color:red;}';
const scale=keyframes`
0% {
    transform:scaleY(0);
  }
  100% {
    transform:scaleY(1);
  }

`
export const GardenCalendarStyledContainer=styled.div<calendar>`
    .fc-col-header-cell.fc-day.fc-day-sat{
        color:blue;
    }
    .fc-daygrid-day.fc-day.fc-day-sat{
        color:blue;
    }
    .fc-col-header-cell.fc-day.fc-day-sun{
        color:red;
    }
    .fc-daygrid-day.fc-day.fc-day-sun{
        color:red;
    }
    ${tagtest}
    .main-form{
        display:flex;
        flex-direction:row;
        justify-content:center;
        margin-top:2%;
        margin-left:5%;
        width:90%;
        height:75vh;
    }
    .todo-form{
        margin-top:3%;
        width:40%;
        height:100%;
        background-color:#F5ECD9;
        border-radius:69px;
    }
    .todo{
        width:100%;
        text-align:center;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }
    .todo-date{
        font-size:60px;
        color:#C3A15F;
        font-weight:bold;
        margin-top:30%;
    }
    .todo-day{
        font-size:45px;
        color:#C3A15F;
        font-weight:bold;
    }
    .calendar-form{
        margin-left:5%;
        width:90%;
        height:40%;
        padding-bottom:5%;
    }
    .fc fc-media-screen fc-direction-ltr fc-theme-standard{
        height:10px;
    }

    .plant{
        background-color:#C4C4C4;
        width:80%;
        border-radius:67px;
        margin-top:20%;
        text-align:center;
    }

    .plant-list{
        background-color:#E8D2A8;
        width:70%;
        margin-bottom:1%;
        display:flex;
        justify-content:center;
        flex-direction:row;
    }
    .plant-input{
        flex-shrink:0;
        width:150px;
    }
    .plant-input-add-btn{
        flex-grow:1;
        background-color: transparent;
        border: 0.1px solid #fff;
        color: #fff;
        &:hover{
            background-color: green;
            cursor:pointer;
        }
    }
    .detail-list{
        text-align:left;
    }
    ${props=>props.plantlist==='block'?
    css`.plant-list{
        animation-name:${scale};
        transform-origin: top;
        animation-duration:0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count:1;
        animation-play-state: running;
    }`:``}
    .plant-label{
        margin-left:10%;
    }
    .plant-add-btn{
        border-color: transparent transparent transparent transparent;
        background: transparent;
        cursor:pointer;
        float:right;
    }


    .management{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
    .management-list{
       
        background-color:#E8D2A8;
        width:70%;
        margin-bottom:1%;
        display:flex;
        align-items:center;
        flex-direction:column;
    }
    .management-input-save-btn{
        background-color: transparent;
        border: 0.1px solid #fff;
        color: #fff;
        &:hover{
            background-color: green;
            cursor:pointer;
        }
    }
    ${props=>props.managementlist==='block'?
    css`.management-list{
        animation-name:${scale};
        transform-origin: top;
        animation-duration:0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count:1;
        animation-play-state: running;
    }`:``}
    .management-label{
        margin-left:10%;
    }
    .management-add-btn{
        border-color: transparent transparent transparent transparent;
        background: transparent;
        cursor:pointer;
        float:right;
    }

    .harvest{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
    .harvest-list{
        background-color:#E8D2A8;
        width:70%;
        margin-bottom:1%; 
        display:flex;
        align-items:center;
        flex-direction:column;
    }
    .harvest-input-save-btn{
        background-color: transparent;
        border: 0.1px solid #fff;
        color: #fff;
        &:hover{
            background-color: green;
            cursor:pointer;
        }
    }
    ${props=>props.harvestlist==='block'?
    css`.harvest-list{
        animation-name:${scale};
        transform-origin: top;
        animation-duration:0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count:1;
        animation-play-state: running;
    }`:``}
    .harvest-label{
        margin-left:10%;
    }
    .harvest-add-btn{
        border-color: transparent transparent transparent transparent;
        background: transparent;
        cursor:pointer;
        float:right;
    }

    .remove{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
    .remove-list{
        background-color:#E8D2A8;
        width:70%;
        margin-bottom:1%;
        display:flex;
        align-items:center;
        flex-direction:column;
       
    }
    .remove-input-save-btn{
        background-color: transparent;
        border: 0.1px solid #fff;
        color: #fff;
        &:hover{
            background-color: green;
            cursor:pointer;
        }
    }
    ${props=>props.removelist==='block'?
    css`.remove-list{
        animation-name:${scale};
        transform-origin: top;
        animation-duration:0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count:1;
        animation-play-state: running;
    }`:``}
    .remove-label{
        margin-left:10%;
    }
    .remove-add-btn{
        border-color: transparent transparent transparent transparent;
        background: transparent;
        cursor:pointer;
        float:right;
    }
`
