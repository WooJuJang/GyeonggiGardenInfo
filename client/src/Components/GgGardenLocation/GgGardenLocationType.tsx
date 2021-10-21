
export type gardenDetailInfoType={
    SG_NM?: string,
    OPERT_MAINBD_NM?: string,
    KITGDN_NM?: string,
    SUBFACLT_CONT?: string,
    LOTOUT_PC_CONT?: string,
    REFINE_LOTNO_ADDR: string,
    REFINE_WGS84_LOGT?: string | null |undefined,
    REFINE_WGS84_LAT?: string | null | undefined
}

export interface inserUserGardenVar{
    garden_name:string,
    garden_latitude:number,
    garden_longitude:number,
    moisture:number,
    nutrition:number,
    weed_quantity:number
}

export type currentPostsType={
    ALL_AR_DESC: string
    APLCATN_METH_CONT: string |null
    HMPG_ADDR?: string | null
    KITGDN_IDNTFY_NO: string
    KITGDN_NM: string
    LOTOUT_AR_DESC: string
    LOTOUT_PC_CONT: string
    OPERT_MAINBD_NM: string
    RECRUT_PERD?: string | null
    REFINE_LOTNO_ADDR: string
    REFINE_ROADNM_ADDR?: string | null
    REFINE_WGS84_LAT?: string | null
    REFINE_WGS84_LOGT?: string | null
    REFINE_ZIP_CD: string
    REGIST_DE: string
    SIGUN_CD: string
    SIGUN_NM: string
    SUBFACLT_CONT?: string | null
    UPD_DE: string
    __typename?:string
}

export interface currentPostsData{
    findGardenDetailInfo:currentPostsType[]
}

export type findLogtLatType={
    Logt:number,
    Lat:number
}
export interface findLogtLatData{
    findLogtLat:findLogtLatType[]
}
export type LogtLatInventoryVars ={
    address:string
}
export type userInfoType={
    id:string,
    city:string,
    garden_name:string
}
