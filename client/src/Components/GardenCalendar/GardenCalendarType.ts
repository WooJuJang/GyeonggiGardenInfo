export type userPlantInfoType={
    harvest_date:string[],
    id:string,
    plant_date:string[],
    remove_date:string[],
    user_crops:string
}
export interface userPlantInfoData{
    findUserPlantInfo:userPlantInfoType[]
}

export type manageListType={
    [index:string]:string,
    fertilizer: string,
    watering: string,
    weed: string,
    fixture_install: string
}
export interface userManageInfoData{
    findUserManageInfo:manageListType[]
}
export type daylistType={
    [index:string]:string,
    Mon:string,
    Tue:string,
    Wed:string,
    Thu:string,
    Fri:string,
    Sat:string,
    Sun:string
}
export type findHolidayType={
    dateName:string,
    locdate:number
}
export type oranizeEventType={
    title:string[],
    date:string,
    color:string
}
export interface EventSourceInput{
    EventSourceInput:oranizeEventType[]
}
export type eventType={
    title:string,
    date:string
}

export type ManageDateSaveType={
    [index:string]:string,
    fertilizer: string,
    watering: string,
    weed: string,
    fixture_install: string
}