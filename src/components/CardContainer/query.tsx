import {gql} from "@apollo/client";

export default gql`
        query Countries($language: String!){
            Countries(language: $language){
                id
                name
                video
                urlName
                capital
            }
        }`;
