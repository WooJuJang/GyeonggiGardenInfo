import UserInfo from '../schema/UserInfo.js';

const resolvers={
    Query:{
        hello:(_,{})=>{
            return "dd";
        }
    },
    Mutation:{
        createUser:async(_,args)=>{
            const result=await UserInfo.findOne({id:args.id});
                 if(result == null){
                const newUser=new UserInfo({
                    id:args.id,
                    password:args.password,
                    city:args.city,
                    area:"",
                    fertilizer:[""],
                    fixture_install:false,
                    garden_latitude:0,
                    garden_longitude:0,
                    garden_name:"",
                    garden_type:0,   
                    moisture:0,
                    nutrition:0,
                    plastic:false,
                    user_use_location:"",
                    watering:[""],
                    weed:[""],
                    weed_quantity:0,
                });
                 await newUser.save();
                 console.log(args);
                 return true;
            }else{
                console.log("The Same Id already exits :(");
                return false;
            }
        }
    }
}

export default resolvers