export const IDError=()=>{
    throw new Error("ID does not exist.")
    
}
export const PasswordError=()=>{
    throw new Error("Password do not match.")
}
export const Kakao_InvalidAddress=()=>{
    return new Error("잘못된 주소입니다.")
}