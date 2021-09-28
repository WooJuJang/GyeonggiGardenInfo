import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import token from '../schema/Token.js'


let errorObj={
    error:"",
}
let tokenObj={
    type:"accessToken",
    token:"",
}
export const checkAccessToken=async(token,secretkey)=>{
    let decoded;
    try{
        decoded=jwt.verify(token,secretkey)
        
    }catch(err){
        if(err.message==='jwt expired'){
            errorObj.error="access token is expired"
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
        
        const db_token=await token.findOne({id:decoded.token_id},'token')
        if(db_token.token===refreshToken){
            
            const accessToken=jwt.sign(
                {
                    token_id:decoded.token_id
                },
                "secretKey",
                {
                    subject:"user_access_token",
                    expiresIn:"5m",
                    issuer:"jwj",
                });
            tokenObj.token=accessToken
            
            return tokenObj
        }
         errorObj.error='Invalid Token';
         return errorObj


    }catch(err){
       
        if(err.message==='jwt expired'){
            errorObj.error='refresh token is expired'
            return errorObj
        }
      
        
    }
  
}

export const compare = (args, users) => new Promise((resolve, rejcet) => {//async,await방식의 비동기함수로 만듬, 콜백함수는 잘 사용안함으로 이와같은 방식으로 바꿔서 사용해야함
    return bcrypt.compare(args.password,users['password'],(err,res)=>{
        if(err) rejcet(err)
        resolve(res)
    })
})
export const makejwttoken=async(id)=>new Promise((resolve,rejcet)=>{
  
    const refreshToken=jwt.sign({
        token_id:id
    },
    "secretKey",
    {
        subject:"user_refresh_token",
        expiresIn:'10m',
        issuer:"jwj"
    })
    const newToken=new token({
        id:id,
        token:refreshToken,
    })
     newToken.save();
    
    resolve(refreshToken)
})
