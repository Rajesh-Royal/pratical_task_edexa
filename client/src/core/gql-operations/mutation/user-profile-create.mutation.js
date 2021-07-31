import { gql } from "@apollo/client";

export const USER_PROFILE_CREATE = gql`
  mutation CreateUserProfile(
    $name: String!
    $age: Float!
    $address: String!
    $profilePic: String!
  ) {
    CreateUserProfile(name: $name, address: $address, age: $age, profilePic: $profilePic) {
      _id
    }
  }
`;
