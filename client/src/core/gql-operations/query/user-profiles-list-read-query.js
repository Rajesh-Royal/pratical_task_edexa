import { gql } from "@apollo/client";

export const USER_PROFILES_LIST_READ = gql`
  query ReadUserProfiles {
    ReadUserProfiles {
      _id
      name
      profilePic
      address
      age
    }
  }
`;
