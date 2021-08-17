
import { ApolloServer } from 'apollo-server';
import axios from 'axios';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typeDefs.js';
import {checkToken} from './middleware/auth.js';


//경기데이터드림_인증키_경기텃밭정보 사용
const key='331d091f70164b18abe03042eed4e376';
const addr='https://openapi.gg.go.kr/KitgdnCouout?';
const addr1='KEY='+key;
const addr2='&Type=json&pIndex=1&pSize=5'

var myaddr=addr+addr1+addr2+'&SIGUN_NM='+encodeURI('안성시');

//경기텃밭정보api axios 통신
axios.get(myaddr).then(res => console.log(res.data['KitgdnCouout'][1]['row']))


//apollo-server start
const token=''
const server=new ApolloServer({
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    },
    typeDefs,
    resolvers,
    playground:true,
    context:async({req})=>{
        try{
            const token=req.headers.authorization.substr(7)    
            if (token){
                    const user=await checkToken(token,"secretKey")
                    return user
            }
        }catch(e){
            console.log(e)
            return null
        }

        return null
    }
});

server.listen().then(({url})=>{
    console.log(`listening at ${url}`);
})

//카카오 로컬 API연결
const fullAddress=encodeURI('경기도 안성시 공도읍 진건중길14');
axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`, {
    headers: { Authorization: 'KakaoAK 1d3da700bd5dd5640d5a617d5a7b1410' },
})
    .then(res => {
        console.log('*****************************')
        const location_x=res.data.documents[0].x;
        const location_y =res.data.documents[0].y;
        console.log(location_x)
        console.log(location_y)


        setLocationObj({
            si:location.address.region_1depth_name,
            gu:location.address.region_2depth_name,
            dong:location.address.region_3depth_name,
            locationX:location.address.x,
            locationY:location.address.y,
        })
    })

//위경도 <->기상청 격자 변환 함수
    // LCC DFS 좌표변환을 위한 기초 자료
    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)
    //
    // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
    //
    function dfs_xy_conv(code, v1, v2) {
        var DEGRAD = Math.PI / 180.0;
        var RADDEG = 180.0 / Math.PI;

        var re = RE / GRID;
        var slat1 = SLAT1 * DEGRAD;
        var slat2 = SLAT2 * DEGRAD;
        var olon = OLON * DEGRAD;
        var olat = OLAT * DEGRAD;

        var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);
        var rs = {};
        if (code == "toXY") {
            rs['lat'] = v1;
            rs['lng'] = v2;
            var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
            ra = re * sf / Math.pow(ra, sn);
            var theta = v2 * DEGRAD - olon;
            if (theta > Math.PI) theta -= 2.0 * Math.PI;
            if (theta < -Math.PI) theta += 2.0 * Math.PI;
            theta *= sn;
            rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        }
        else {
            rs['x'] = v1;
            rs['y'] = v2;
            var xn = v1 - XO;
            var yn = ro - v2 + YO;
            ra = Math.sqrt(xn * xn + yn * yn);
            if (sn < 0.0) - ra;
            var alat = Math.pow((re * sf / ra), (1.0 / sn));
            alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

            if (Math.abs(xn) <= 0.0) {
                theta = 0.0;
            }
            else {
                if (Math.abs(yn) <= 0.0) {
                    theta = Math.PI * 0.5;
                    if (xn < 0.0) - theta;
                }
                else theta = Math.atan2(xn, yn);
            }
            var alon = theta / sn + olon;
            rs['lat'] = alat * RADDEG;
            rs['lng'] = alon * RADDEG;
        }
        return rs;
    }
var rs=dfs_xy_conv("toXY","37.44910833333333","126.90419722222222");
//console.log(rs.x,rs.y);


//기상청 단기예보 API 연결
var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=DDQEBDDCmlvZEuTO2bZjjycsI3A%2Bb15YZAgKYj%2FNmFlju54lxuKi7LC2R7CIdY2U6%2F%2BvDblYu2AtmtxgLmNSRQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20210804'); /* */
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('1200'); /* */
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /* */
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /* */

axios.get(url+queryParams).then(res=>{
    console.log(res.data.response.body.items)
})

//mongoose 연결
mongoose.connect("mongodb://127.0.0.1:27017/garden",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
}).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=DDQEBDDCmlvZEuTO2bZjjycsI3A%2Bb15YZAgKYj%2FNmFlju54lxuKi7LC2R7CIdY2U6%2F%2BvDblYu2AtmtxgLmNSRQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2021'); /* */
queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent('08'); /* */

axios.get(url+queryParams).then(res=>{
    console.log(res.data.response.body.items)
})
