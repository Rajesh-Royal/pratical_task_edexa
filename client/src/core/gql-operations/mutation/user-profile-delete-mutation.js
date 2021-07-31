import { gql } from "@apollo/client";

export const USER_PROFILE_DELETE = gql`
  mutation DeleteUserProfile($userId: String!) {
    DeleteUserProfile(userId: $userId)
  }
`;
