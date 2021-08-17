import gql from 'graphql-tag'

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
        }
    }
`;