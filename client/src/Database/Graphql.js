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
        }
    }
`;

export const INSERTUSERGARDEN=gql`
    mutation insertUserGarden($garden_name:String!){
        insertUserGarden(garden_name:$garden_name)
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