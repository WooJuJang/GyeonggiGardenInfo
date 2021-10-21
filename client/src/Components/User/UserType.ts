export type loginInfoType={
    id:string,
    password:string
}
export interface signinData{
    signin:string
}
export type userInfoType={
    id:string,
    password:string,
    city:string,
}
export interface signupData{
    signup:userInfoType
}
export type userGardenInfoType={
    id:string,
    city:string,
    garden_name:string
}
export interface userGardenInfoData{
    findUser:userGardenInfoType
}