import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
    }
  }
`;
