import {gql} from 'apollo-server';

const typeDefs=gql`
type User{
    id:String!,
    password:String!,
    area:String,
    city:String!,
    fertilizer:[String],
    fixture_install:[String],
    garden_latitude:Float,
    garden_longitude:Float,
    garden_name:String,
    garden_type:Int,   
    moisture:Int,
    nutrition:Int,
    plastic:Boolean,
    user_use_location:String,
    watering:[String],
    weed:[String],
    weed_quantity:Int,
    exist:Boolean,
}
type GardenInfo{
    SIGUN_CD:String,
    SIGUN_NM:String,
    KITGDN_IDNTFY_NO:String,
    OPERT_MAINBD_NM:String,
    KITGDN_NM:String,
    REFINE_ROADNM_ADDR:String,
    REFINE_LOTNO_ADDR:String,
    REFINE_ZIP_CD:String,
    RECRUT_PERD:String,
    REGIST_DE:String,
    UPD_DE:String,
    ALL_AR_DESC:String,
    LOTOUT_AR_DESC:String,
    LOTOUT_PC_CONT:String,
    SUBFACLT_CONT:String,
    APLCATN_METH_CONT:String,
    HMPG_ADDR:String,
    REFINE_WGS84_LAT:String,
    REFINE_WGS84_LOGT:String,

}
type Token{
    id:String,
    token:String,
}
type Crops{
    crops:String,
    belong:String,
    interval:Int,
    fixture:Boolean,
    water:Int,
    plant:Int,
    explain:String,
    harvest:String,
    harvestable_crops:Boolean,
    image:String,
}
type UserPlantInfo{
    id:String,
    user_crops:String,
    plant_date:[String],
    harvest_date:[String],
    remove_date:[String]
}
type Holiday{
    dateName:String,
    locdate:Int,
}
type Forecast{
    category:String,
    obsrValue:String,
}
    type Query{
        findUser:User
        findGardenSGNM(area:String!):[String]
        findGardenDetailInfo(area:String!):[GardenInfo]
        findLogtLat(address:String!):[Float]
        findToken(id:String!):String
        findSeason(season:String!):[Crops]
        findUserPlantInfo(id:String!):[UserPlantInfo]
        findUserManageInfo(id:String!):User
        findHoliday(year:String!):[Holiday]
        findForecast(date:String!,time:String!,lat:Float!,long:Float!):[Forecast]
    }
    type Mutation{
        signup(id:String!,password:String!,city:String!):User
        signin(id:String!,password:String!):String
        insertUserGarden(garden_name:String!,garden_latitude:Float,garden_longitude:Float):Boolean
        logout(id:String!):Boolean
        insertUserCrops(id:String!,user_crops:String!,plant_date:String!):UserPlantInfo
        insertHarvestDate(id:String!,user_crops:String!,harvest_date:String!):UserPlantInfo
        insertRemoveDate(id:String!,user_crops:String!,remove_date:String!):UserPlantInfo
        insertManageDate(id:String!,fertilizer:String,watering:String,weed:String,fixture_install:String):User
    }
`;
export default typeDefs;

