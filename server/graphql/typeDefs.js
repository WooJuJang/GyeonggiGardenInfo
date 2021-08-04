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
}
    type Query{
        findPassword(password:String!):Boolean!
    }
    type Mutation{
        createUser(id:String!,password:String!,city:String!):User
        login(id:String!,password:String!):Boolean!
    }
`;
export default typeDefs;