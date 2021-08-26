import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import token from '../schema/Token.js'
import {AuthenticationError} from 'apollo-server-core'
//    export const checkToken=(token,secretkey)=>{

//     return new Promise((resolve,reject)=>{
//         jwt.verify(token,secretkey,(error,decoded)=>{
//             if(error){
//                 if(error.message==='jwt expired'){
//                     reject("TOKEN_EXPIRED")
//                 }
//                 reject(error)
//             }
            
//             resolve(decoded)
//         })
//     }


//     )
// }

let errorObj={
    error:"",
}
export const checkAccessToken=async(token,secretkey)=>{
    let decoded;
    try{
        decoded=jwt.verify(token,secretkey)
      
    }catch(err){
        if(err.message==='jwt expired'){
            errorObj.error=err.message
            return(errorObj)
        }else{
            errorObj.error=err.message
            return(errorObj)
        }
    }
    return decoded
    
}
export const checkRefreshtoken=async(refreshToken,secretkey)=>{
    let decoded;
    try{
        decoded=jwt.verify(refreshToken,secretkey)


    }catch(err){
        if(err.message==='jwt expired'){
            errorObj.error='refresh token is expired'
            return errorObj
        }
      
        
    }
    return decoded
}

export const compare = (args, users) => new Promise((resolve, rejcet) => {//async,await방식의 비동기함수로 만듬, 콜백함수는 잘 사용안함으로 이와같은 방식으로 바꿔서 사용해야함
    return bcrypt.compare(args.password,users['password'],(err,res)=>{
        if(err) rejcet(err)//암호화시 단방향 양방향 차이점
        resolve(res)
    })
})
export const makejwttoken=async(id)=>new Promise((resolve,rejcet)=>{
    var tokens=[]
    const refreshToken=jwt.sign({
        token_id:id
    },
    "secretKey",
    {
        subject:"user_refresh_token",
        expiresIn:'10s',
        issuer:"jwj"
    })
    const newToken=new token({
        id:id,
        token:refreshToken,
    })
     newToken.save();
    const accessToken=jwt.sign(
        {
            token_id:id
        },
        "secretKey",
        {
            subject:"user_access_token",
            expiresIn:"5s",
            issuer:"jwj",
        });
       tokens.push(accessToken)
       tokens.push(refreshToken)
       console.log(tokens)
    resolve(tokens)
})
