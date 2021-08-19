import axios from 'axios';

//카카오 로컬 API연결
export const kakao_local_api=(address)=>new Promise((resolve,reject)=>{
    const fullAddress=encodeURI(address);
    var setLogtLat=[];
    axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`, {
        headers: { Authorization: 'KakaoAK 1d3da700bd5dd5640d5a617d5a7b1410' },
    })
        .then(res => {
                const location_x=res.data.documents[0].x;
                const location_y =res.data.documents[0].y;
                console.log(location_x)
                console.log(location_y)
                setLogtLat.push(location_x)
                setLogtLat.push(location_y)
                resolve(setLogtLat)
        })
        .catch(err =>{
            console.log(err.message)
        })
   
})
