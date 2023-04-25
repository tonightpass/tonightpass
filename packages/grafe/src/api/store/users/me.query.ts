import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      identifier {
        email
        phoneNumber
      }
      identity {
        firstName
        lastName
        fullName
        userName
        profilePictureUrl
        gender
        birthDate
        idValid
      }
      addresses {
        name
        address
        city
        country
        zipCode
        geometry {
          latitude
          longitude
        }
      }
      connections {
        client {
          name
          version
        }
        createdAt
        device {
          brand
          type
        }
        ip
        os {
          name
          version
        }
        updatedAt
      }
      preferences {
        currency
        language
        notifications
      }
      createdAt
      updatedAt
    }
  }
`;
