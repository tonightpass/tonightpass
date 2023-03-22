import { gql } from "@apollo/client";

export const UNSUBSCRIBE_FROM_NEWSLETTER = gql`
  mutation UnsubscribeFromNewsletter($userEmail: String!) {
    unsubscribeFromNewsletter(userEmail: $userEmail)
  }
`;
