import styled from "@emotion/styled"

const test='2021-08-16';
const tagtest='[data-date=\''+test+'\']{color:red;}';
export const GardenCalendarStyledContainer=styled.div`
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
        height:100%;
        border-radius:67px;
    }
    .management{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
    .management-list{
        text-align:left;
    }
    .harvest{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
    .remove{
        background-color:#C4C4C4;
        width:80%;
        height:100%;
        border-radius:67px;
    }
 
`
