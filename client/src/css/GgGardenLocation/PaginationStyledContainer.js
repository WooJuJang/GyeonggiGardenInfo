import Styled from '@emotion/styled';

export const PaginationStyledContainer=Styled.div`
`
export const PageUl = Styled.ul`
  position:relative;
  bottom:0px;
  float:center;
  margin-left:15%;
  width:70%;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:white;
  padding:1px;
  border-top:3px solid #186EAD;
  border-bottom:3px solid #186EAD;
  background-color: rgba( 0, 0, 0, 0.4 );
`;

export const PageLi=Styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:5px;
  border-radius:5px;
  width:25px;
  &:hover{
      cursor:pointer;
      background-color:green;
  }
`;
export const PageSpan=Styled.div`
  &:hover::after,
  &:focus::after{
      background-color:red;
  }
`;