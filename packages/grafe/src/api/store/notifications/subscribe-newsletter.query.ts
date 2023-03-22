import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_NEWSLETTER = gql`
  mutation SubscribeToNewsletter($userEmail: String!) {
    subscribeToNewsletter(userEmail: $userEmail)
  }
`;
