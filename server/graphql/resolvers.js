import userinfo from '../schema/UserInfo.js';
import { GetGardenDetailInfo, GetGardenSGNM } from '../API/garden_info_api.js'
import { kakao_local_api } from '../API/kako_local_api.js';
import { IDError, Make_New_AccessToken, PasswordError, Token_Error } from '../Error/ErrorHandling.js';
import { compare, makejwttoken } from '../middleware/auth.js';
import token from '../schema/Token.js';
import { spring,summer,fall } from '../schema/Crops.js';
import userplantinfo from '../schema/UserPlantInfo.js';
import getHoliday from '../API/holiday.js';



const resolvers = {
    Query: {
        findUser: async (_, __, context) => {
            
            if (context.error === "access token is expired") {
               
                return Token_Error(context.error);
            } else if (context.error === "refresh token is expired") {
               
                return Token_Error(context.error)
            }else if(context.error === "Invalid Token"){
                return Token_Error(context.error)
            }
            else if(context.token) {
             
                return Make_New_AccessToken(context)
            }
            
            const result = await userinfo.findOne({ id: context.token_id }, 'id city garden_name')
            const result_arr = []
            result_arr[0] = result.id
            result_arr[1] = result.city
            const newuser = new userinfo({
                id: result.id,
                city: result.city,
                garden_name: result.garden_name
            })
            console.log(newuser)
            return newuser

        },
        findGardenSGNM: async (_, args) => {

            const garden_sgnm = await GetGardenSGNM()
            let result = [];
            if (args.area !== "") {
                for (let i = 0; i < garden_sgnm.length; i++) {
                    if (garden_sgnm[i].includes(args.area)) {
                        result.push(garden_sgnm[i])
                    }

                }
                return result;
            }
            return result;

        },
        findGardenDetailInfo: async (_, args) => {
            const result = await GetGardenDetailInfo(args)
            return result
        },
        findLogtLat: async (_, args) => {
            const setLogtLat = await kakao_local_api(args.address);
            console.log(setLogtLat)
            return setLogtLat
        },
        findSeason:async(_,args)=>{
            var seasonInfo;
            if(args.season==='spring'){
                seasonInfo=await spring.find({})
            }else if(args.season==='summer'){
                seasonInfo=await summer.find({})
            }else if(args.season==='fall'){
                seasonInfo=await fall.find({})
            }

            return seasonInfo
        },
        findUserPlantInfo:async(_,args)=>{
            return await userplantinfo.find({id:args.id}) 
        },
        findUserManageInfo:async(_,args)=>{
            return await userinfo.findOne({id:args.id},'fertilizer watering weed fixture_install')
        },
        findHoliday:async(_,args)=>{
            return getHoliday(args.year)
        }
    },
    Mutation: {
        signup: async (_, args) => {
            const result = await userinfo.findOne({ id: args.id });
            if (result == null) {
                const newUser = new userinfo({
                    id: args.id,
                    password: args.password,
                    city: args.city,
                });
                return await newUser.save();
            } else {
                console.log("The Same Id already exits :(");
                return null;
            }
        },
        signin: async (_, args, context) => {

            const user = await userinfo.findOne({ id: args.id }, 'id city password');
            if (user === null) {
                IDError();
            }
            //findOne는 맞는값이 없으면 null 리턴
            const compare_result = await compare(args, user);
            if (compare_result === true) {
                const token_result = await makejwttoken(args.id)
                console.log("refreshToken is ",token_result)


                return token_result
            } else {
                PasswordError();
            }

        },
        insertUserGarden: async (_, args, context) => {
            let doc = await userinfo.findOneAndUpdate({ id: context.token_id }, { garden_name: args.garden_name })
            return false


        },
        logout: async(_,args)=>{
                await token.deleteOne({id:args.id})
            return true
        },
        insertUserCrops:async(_,args)=>{
            return await userplantinfo.findOneAndUpdate({id:args.id,user_crops:args.user_crops},{$addToSet:{plant_date:args.plant_date}},{upsert:true,new:true,strict:false})

        },
        insertHarvestDate:async(_,args)=>{
            return await userplantinfo.findOneAndUpdate({id:args.id,user_crops:args.user_crops},{$addToSet:{harvest_date:args.harvest_date}},{upsert:true,new:true,strict:false})

        },
        insertRemoveDate:async(_,args)=>{
             return await userplantinfo.findOneAndUpdate({id:args.id,user_crops:args.user_crops},{$addToSet:{remove_date:args.remove_date}},{upsert:true,new:true,strict:false})

        },
        insertManageDate:async(_,args)=>{
            await userinfo.findOneAndUpdate({id:args.id},
                {$addToSet:{fertilizer:args.fertilizer,watering:args.watering,weed:args.weed,fixture_install:args.fixture_install},},
                {upsert:true,new:true,multi:true,strict:false})
                
            return await userinfo.findOneAndUpdate({id:args.id},
                {$pull:{fertilizer:"",watering:"",weed:"",fixture_install:""}},
                {new:true,multi:true,strict:false})
                
        }

    }
}
export default resolvers