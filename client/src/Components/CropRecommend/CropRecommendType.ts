export type cropInfoType={
    crops:string,
    belong:string,
    interval:string,
    fixture:string,
    water:string,
    plant:string,
    explain:string,
    harvest:string,
    harvestable_crops:string,
    image:string
}
export interface cropsInfoData{
    findSeason:cropInfoType[]
}