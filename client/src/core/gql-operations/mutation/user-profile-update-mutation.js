import { gql } from "@apollo/client";

export const USER_PROFILE_UPDATE = gql`
  mutation UpdateUserProfile(
    $name: String
    $age: Float
    $address: String
    $profilePic: String
    $_id: ID!
  ) {
    UpdateUserProfile(name: $name, address: $address, age: $age, _id: $_id, profilePic: $profilePic)
  }
`;
