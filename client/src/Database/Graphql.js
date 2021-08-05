import gql from 'graphql-tag'

export const SIGNUP=gql`
    mutation Signup($id:String!,$password:String!,$city:String!){
        singup(id:$id,password:$password,city:$city){
            id
            password
            city
        }
    }
`;