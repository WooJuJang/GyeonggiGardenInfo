export type userInfoType={
    id:string,
    city:string,
    garden_name:string,
    garden_latitude?:number,
    garden_longitude?:number,
    moisture?:number | undefined,
    nutrition?:number | undefined,
    weed_quantity?:number | undefined,
    watering?:string[] | undefined,
    fertilizer?:string[] | undefined,
    weed?:string[] | undefined
}
export interface userInfoData{
    findUser:userInfoType
}

type userManageInfoType={
    fertilizer?:string[],
    watering?:string[],
    weed?:string[],
    fixture_install?:string[]
}
export interface userManageInfoData{
    findUserManageInfo:userManageInfoType
}

export type forcastType={
    category:string,
    obsrValue:string
}
export interface forcastData{
    findForecast:forcastType[]
}

export type pty_listType={
    [index:string]:string,
    0:string,
    1:string,
    2:string,
    3:string,
    5:string,
    6:string,
    7:string
}