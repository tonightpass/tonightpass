import { gql } from "@apollo/client";

export const IDENTIFY_USER = gql`
  query IdentifyUser($identifier: String!) {
    identifyUser(identifier: $identifier)
  }
`;
