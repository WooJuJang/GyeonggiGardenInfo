import userinfo from '../schema/UserInfo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const compare = (args, users) => new Promise((resolve, rejcet) => {//async,await방식의 비동기함수로 만듬, 콜백함수는 잘 사용안함으로 이와같은 방식으로 바꿔서 사용해야함
    return bcrypt.compare(args.password,users['password'],(err,res)=>{
        if(err) rejcet(err)
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
        return token
    
    // jwt token verify
    // try{
    //     var check=jwt.verify(token,"secretKey")
    //     if(check){
    //         console.log("check " + check.token_id)
    //     }
    // }catch(e){
    //     console.log(e)
    // }
})

const resolvers={
    Query:{
        findPassword:(_,{password})=>{
            return userinfo.findOne({password});
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
        signin:async (_,args)=>{
            const user = await userinfo.findOne({id:args.id},'password');
            if(user){//findOne는 맞는값이 없으면 null,undefined를 리턴하지 않고 바로 에러를 던짐 따라서 조건문사용함
                const compare_result=await compare(args, user);
                await makejwttoken(args.id)
                args.cookie("jwt","token",{
                    httpOnly:true
                })
                return true
            }else{
                return false
            }
            
        }
    }
}

export default resolvers