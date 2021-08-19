import userinfo from '../schema/UserInfo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {GetGardenDetailInfo, GetGardenSGNM} from '../API/garden_info_api.js'
import { kakao_local_api } from '../API/kako_local_api.js';


const compare = (args, users) => new Promise((resolve, rejcet) => {//async,await방식의 비동기함수로 만듬, 콜백함수는 잘 사용안함으로 이와같은 방식으로 바꿔서 사용해야함
    return bcrypt.compare(args.password,users['password'],(err,res)=>{
        if(err) rejcet(err)//암호화시 단방향 양방향 차이점
        resolve(res)
    })
})
const makejwttoken=(id)=>new Promise((resolve,rejcet)=>{
    const token=jwt.sign(
        {
            token_id:id
        },
        "secretKey",
        {
            subject:"user_token",
            expiresIn:"1d",
            issuer:"jwj",
        });
        resolve(token)
})

const resolvers={
    Query:{
        findUser:async(_,__,context)=>{
            
            console.log('context : '+context.token_id)
             const result=await userinfo.findOne({id:context.token_id},'id city garden_name')
             const result_arr=[]
             result_arr[0]=result.id
             result_arr[1]=result.city
             console.log(result_arr)
             const newuser=new userinfo({
                 id:result.id,
                 city:result.city,
                 garden_name:result.garden_name
             })
             console.log(newuser)
            return newuser
            
        },
        findGardenSGNM:async(_,args)=>{
            
            const garden_sgnm=await GetGardenSGNM()
            let result=[];
            for(let i=0;i<garden_sgnm.length;i++){
                if(garden_sgnm[i].includes(args.area))
                {
                    result.push(garden_sgnm[i])
                }
                
            }
            return result;
        },
        findGardenDetailInfo:async(_,args)=>{
            const result=await GetGardenDetailInfo(args)
            return result
        },
        findLogtLat:async(_,args)=>{
            console.log(args.address)
            const setLogtLat= await kakao_local_api(args.address);
            console.log(setLogtLat)
            return setLogtLat
        }
    },
    Mutation:{
        signup:async(_,args)=>{
            const result=await userinfo.findOne({id:args.id});
                 if(result==null){
                     const newUser=new userinfo({
                         id:args.id,
                         password:args.password,
                         city:args.city,
                     });
                     return await newUser.save();        
            }else{
                console.log("The Same Id already exits :(");
                return null;
            }
        },
        signin:async (_,args,context)=>{
            try{
                const user = await userinfo.findOne({id:args.id},'id city password') ;
                console.log('signin context: '+context.token_id)
                //findOne는 맞는값이 없으면 null,undefined를 리턴하지 않고 바로 에러를 던짐 따라서 조건문사용함
                const compare_result=await compare(args, user);
                if(compare_result===true){
                    const token_result=await makejwttoken(args.id)
                    return token_result
                }else{
                    return null
                }

            }catch{
                return null
            }

            
        },
        insertUserGarden:async(_,args,context)=>{
                console.log(context.token_id)
                let doc=await userinfo.findOneAndUpdate({id:context.token_id},{garden_name:args.garden_name})
                return false
                
            
        }
    }
}
export default resolvers