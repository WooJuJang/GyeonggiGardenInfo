import gql from 'graphql-tag'
export const FINDGARDENSGNM=gql`
    query findGardenSGNM($area:String!){
        findGardenSGNM(area:$area)
    }
`;

export const FINDGARDENDETAILINFO=gql`
    query findGardenDetailInfo($area:String!){
        findGardenDetailInfo(area:$area){
            SIGUN_CD
            SIGUN_NM
            KITGDN_IDNTFY_NO
            OPERT_MAINBD_NM
            KITGDN_NM
            REFINE_ROADNM_ADDR
            REFINE_LOTNO_ADDR
            REFINE_ZIP_CD
            RECRUT_PERD
            REGIST_DE
            UPD_DE
            ALL_AR_DESC
            LOTOUT_AR_DESC
            LOTOUT_PC_CONT
            SUBFACLT_CONT
            APLCATN_METH_CONT
            HMPG_ADDR
            REFINE_WGS84_LAT
            REFINE_WGS84_LOGT
        }
    }
`;
export const FINDLOGTLAT=gql`
    query findLogtLat($address:String!){
        findLogtLat(address:$address)
    }
`;
export const SIGNUP=gql`
    mutation signup($id:String!,$password:String!,$city:String!){
        signup(id:$id,password:$password,city:$city){
            id
            password
            city
        }
    }
`;
export const SIGNIN=gql`
    mutation signin($id:String!,$password:String!){
        signin(id:$id,password:$password)
    }
`;
export const FINDUSER=gql`
    query findUser{
        findUser{
            id
            city
            garden_name
            garden_latitude
            garden_longitude
            moisture
            nutrition
            weed_quantity
        }
    }
`;

export const INSERTUSERGARDEN=gql`
    mutation insertUserGarden($garden_name:String!,$garden_latitude:Float,$garden_longitude:Float){
        insertUserGarden(garden_name:$garden_name,garden_latitude:$garden_latitude,garden_longitude:$garden_longitude)
    }
`;

export const LOGOUT=gql`
    mutation logout($id:String!){
        logout(id:$id)
    }
`;

export const FINDSEASON=gql`
    query findSeason($season:String!){
        findSeason(season:$season){
            crops
            belong
            interval
            fixture
            water
            plant
            explain
            harvest
            harvestable_crops
            image
        }
    }
`;

export const FINDUSERPLANTINFO=gql`
    query findUserPlantInfo($id:String!){
        findUserPlantInfo(id:$id){
            id
            user_crops 
            plant_date
            harvest_date
            remove_date
        }
    }
`;

export const INSERTUSERCROPS=gql`
    mutation insertUserCrops($id:String!,$user_crops:String!,$plant_date:String!){
        insertUserCrops(id:$id,user_crops:$user_crops,plant_date:$plant_date){
            id
            user_crops
            plant_date
            harvest_date
            remove_date           
        }
    }
`;

export const INSERTHARVESTDATE=gql`
    mutation insertHarvestDate($id:String!,$user_crops:String!,$harvest_date:String!){
        insertHarvestDate(id:$id,user_crops:$user_crops,harvest_date:$harvest_date){
            id
            user_crops
            plant_date
            harvest_date
            remove_date           
        }
    }
`;

export const INSERTREMOVEDATE=gql`
    mutation insertRemoveDate($id:String!,$user_crops:String!,$remove_date:String!){
        insertRemoveDate(id:$id,user_crops:$user_crops,remove_date:$remove_date){
            id
            user_crops
            plant_date
            harvest_date
            remove_date           
        }
    }
`;

export const FINDMANAGEINFO=gql`
    query findUserManageInfo($id:String!){
        findUserManageInfo(id:$id){
            fertilizer
            watering
            weed
            fixture_install
        }
    }
`;

export const INSERTMANAGEDATE=gql`
    mutation insertManageDate($id:String!,$fertilizer:String,$watering:String,$weed:String,$fixture_install:String){
        insertManageDate(id:$id,fertilizer:$fertilizer,watering:$watering,weed:$weed,fixture_install:$fixture_install){
            fertilizer
            watering
            weed
            fixture_install
        }
    }
`;

export const FINDHOLIDAY=gql`
    query findHoliday($year:String!){
        findHoliday(year:$year){
            dateName
            locdate
        }
    }
`;

export const FINDFORECAST=gql`
    query findForecast($date:String!,$time:String!,$lat:Float!,$long:Float!){
        findForecast(date:$date,time:$time,lat:$lat,long:$long){
            category
            obsrValue
        }
    }
`;