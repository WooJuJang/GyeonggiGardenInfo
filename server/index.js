
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typeDefs.js';
import {checkAccessToken,checkRefreshtoken} from './middleware/auth.js';
import {ApolloServerPluginLandingPageGraphQLPlayground, AuthenticationError} from 'apollo-server-core';

//apollo-server start
const token=''
const server=new ApolloServer({
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    },
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground(),],
    AuthenticationError,
    context:async({req})=>{
        try{
            let token_type=req.headers.authorization?req.headers.authorization.split(' ')[0]:"";
            
            const token=req.headers.authorization?req.headers.authorization.split(' ')[1]:'';  
            
           
            if (token){
                if(token_type==="Access"){
                    const user=await checkAccessToken(token,"secretKey")
                  

                    return user
                }else if(token_type==="Refresh"){
                    const user=await checkRefreshtoken(token,"secretKey")
                   
                    return user
                }

            }
        }catch(e){
            console.log(e)
            return null
        }

        return null
    }
});

server.listen().then(({url})=>{
    console.log(`listening at ${url}`);
})


//mongoose 연결
mongoose.connect("mongodb://127.0.0.1:27017/garden",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
}).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

