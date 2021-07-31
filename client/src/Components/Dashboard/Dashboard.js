import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_PROFILES_LIST_READ } from "../../core/gql-operations/query/user-profiles-list-read-query";
import { SortByAge, SortByName } from "../../Util/SortByAge";
import TablePagination from "../common/TablePagination";
import Filters from "../Filters";
import AddNewUserProfileButton from "./components/AddNewUserProfileButton";
import UserTable from "./UsersTable";

const Dashboard = () => {
  const { data, loading, startPolling, stopPolling } = useQuery(USER_PROFILES_LIST_READ);

  const [activeRow, setActiveRow] = useState(null);

  // stop polling as soon as data available
  useEffect(() => {
    startPolling(10000);
    if (data?.ReadUserProfiles) {
      stopPolling();
    }
    return () => {
      stopPolling();
    };
  }, [data, startPolling, stopPolling]);

  // employee table pagination logic
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userProfilesPerPage] = useState(10);

  // set initial users in list
  useEffect(() => {
    if (data?.ReadUserProfiles) setUserProfiles(data?.ReadUserProfiles);
  }, [data]);

  // slice user's data for paging
  const indexOfLastUserProfile = currentPage * userProfilesPerPage;
  const indexOfFirstUserProfile = indexOfLastUserProfile - userProfilesPerPage;
  //   user profiles available on paginated page
  const currentUserProfiles = userProfiles?.slice(indexOfFirstUserProfile, indexOfLastUserProfile);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortUsersProfiles = (value) => {
    if (value === "age") {
      // in case of error don't sort it and assign userProfiles again
      setUserProfiles(SortByAge(userProfiles) || userProfiles);
    }
    if (value === "name") {
      setUserProfiles(SortByName(userProfiles) || userProfiles);
    }
  };

  const filterUserProfilesByName = (value) => {
    if (value === "") {
      setUserProfiles(data?.ReadUserProfiles);
      return 0;
    }
    var filteredUserProfile = data?.ReadUserProfiles.filter(function (user) {
      if (user?.name?.includes(value)) {
        return user;
      }
    });
    setUserProfiles(filteredUserProfile);
  };
  return (
    <div>
      <Filters
        sortUsersProfiles={sortUsersProfiles}
        filterUserProfilesByName={filterUserProfilesByName}
      />
      <UserTable
        currentUserProfiles={currentUserProfiles}
        activeRow={activeRow}
        data={data}
        loading={loading}
      />
      <TablePagination
        employeesPerPage={userProfilesPerPage}
        totalEmployees={userProfiles?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <AddNewUserProfileButton />
    </div>
  );
};

export default Dashboard;
