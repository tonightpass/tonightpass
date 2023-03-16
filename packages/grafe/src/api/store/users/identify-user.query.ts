import { gql } from "@apollo/client";

export const IDENTIFY_USER = gql`
  query IdentifyUser($identifyUserInput: IdentifyUserInput!) {
    identifyUser(identifyUserInput: $identifyUserInput)
  }
`;
