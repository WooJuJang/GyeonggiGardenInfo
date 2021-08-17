import jwt from 'jsonwebtoken';

   export const checkToken=(token,secretkey)=>{

    return new Promise((resolve,reject)=>{
        jwt.verify(token,secretkey,(error,decoded)=>{
            if(error){
                reject(error)
            }
            resolve(decoded)
        })
    }


    )
}
