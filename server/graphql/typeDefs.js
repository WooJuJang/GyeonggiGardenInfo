import {gql} from 'apollo-server';

const typeDefs=gql`
    type Query{
        hello:String!
    }
    type Mutation{
        createUser(id:String!,password:String!,city:String!):Boolean
    }
`;
export default typeDefs;