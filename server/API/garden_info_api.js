import axios from 'axios';
//경기데이터드림_인증키_경기텃밭정보 사용
const key='331d091f70164b18abe03042eed4e376';
const addr='https://openapi.gg.go.kr/KitgdnCouout?';
const addr1='KEY='+key;
const addr2='&Type=json&pIndex=1&pSize=100';

export  const GetGardenSGNM=()=>new Promise((resolve,reject)=>{
   const sigun_nm_arr=[];
    var temp_addr2='';
    var myaddr='';
    var uniqueArr=[];
    var index=1;
    while(true){
    temp_addr2='&Type=json&pIndex='+String(index)+'&pSize=1000';
    myaddr=addr+addr1+temp_addr2;
    //경기텃밭정보api axios 통신
    axios.get(myaddr).then(res => { 
        try{
            res.data['KitgdnCouout'][1]['row'].forEach(element=>
                sigun_nm_arr.push(element['SIGUN_NM'])
            )
            
        }catch(e)
        {
            console.log("error")
            reject(uniqueArr)
           
        }        
        const set=new Set(sigun_nm_arr);
        uniqueArr=[...set];
        for(let i=0;i<uniqueArr.length;i++){
            if(uniqueArr[i]==null){
                uniqueArr.splice(i,1);
                i--;
                break;
            }
        }
        resolve(uniqueArr)
        
    })
    index++;
    break;
    }

})
export const GetGardenDetailInfo=(args)=>new Promise((resolve,reject)=>{
    var myaddr=addr+addr1+addr2+'&SIGUN_NM='+encodeURI(args.area);
    
    var result=''
    //경기텃밭정보api axios 통신
    axios.get(myaddr).then(res => {
        //console.log(res.data['KitgdnCouout'][1]['row'][0]['SIGUN_NM'])
        result=res.data['KitgdnCouout'][1]['row']
        console.log(res.data['KitgdnCouout'][1]['row'])
    resolve(result)    
        
        
    })
   
})
