import {gql} from 'apollo-server';

const typeDefs=gql`
type User{
    id:String!,
    password:String!,
    area:String,
    city:String!,
    fertilizer:[String],
    fixture_install:Boolean,
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
    type Query{
        findUser:User
        findGardenSGNM(area:String!):[String]
        findGardenDetailInfo(area:String!):[GardenInfo]
        findLogtLat(address:String!):[Float]
        findToken(id:String!):String
    }
    type Mutation{
        signup(id:String!,password:String!,city:String!):User
        signin(id:String!,password:String!):[String] 
        insertUserGarden(garden_name:String!):Boolean
        logout(id:String!):Boolean
    }
`;
export default typeDefs;