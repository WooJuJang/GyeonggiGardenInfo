import axios from 'axios';

//천문 - 공휴일 
const getHoliday=async(year,month)=>{
    var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=DDQEBDDCmlvZEuTO2bZjjycsI3A%2Bb15YZAgKYj%2FNmFlju54lxuKi7LC2R7CIdY2U6%2F%2BvDblYu2AtmtxgLmNSRQ%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(50); /* */
    queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(year); /* */
    // queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(month); /* */
    const res=await axios.get(url+queryParams)
    console.log(res.data.response.body.items.item)
    return res.data.response.body.items.item
}

export default getHoliday