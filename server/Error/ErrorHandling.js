import { AuthenticationError} from 'apollo-server-core'

export const IDError=()=>{
    throw new Error("ID does not exist.")
    
}
export const PasswordError=()=>{
    throw new Error("Password do not match.")
}
export const Kakao_InvalidAddress=()=>{
    return new Error("잘못된 주소입니다.")
}
export const Token_Error=(error)=>{
    console.log(error)
    if(error === 'jwt expired' ){
        return new AuthenticationError("token expired")
    }else if(error==='refresh token is expired'){
        return new AuthenticationError('refresh token is expired')
    }
    return new AuthenticationError(error)
}