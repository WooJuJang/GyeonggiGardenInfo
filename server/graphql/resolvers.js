import userinfo from '../schema/UserInfo.js';
import bcrypt from 'bcrypt';


const resolvers={
    Query:{
        findPassword:(_,{password})=>{
            return userinfo.findOne({password});
        }
    },
    Mutation:{
        createUser:async(_,args)=>{
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
        login:(_,args)=>{
            var encodepassword=userinfo.findOne({id:args.id},'password',function(err,users){
                if(err) return next(err);
                const same=bcrypt.compareSync(args.password,users['password'])
                return same;
            });
            
            
        }
    }
}

export default resolvers