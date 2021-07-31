import React from "react";
import Button from "../common/Button";

const UserTable = ({ loading, data, activeRow, deleteUser, updateUser, currentUserProfiles }) => {
  const tableHeadings = ["Name", "age", "address", "Delete", "Update"];

  return (
    <div className="flex flex-col overflow-x-scroll xl:overflow-x-hidden my-3">
      <table className="user-table shadow overflow-hidden sm:rounded-lg divide-y divide-gray-200">
        <thead className="bg-gray-200 dark:bg-gray-600">
          <tr className="text-left text-base font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-wider">
            {tableHeadings.map((heading) => {
              return (
                <th scope="col" className="px-6 py-3" key={heading}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-400">
          {!loading && data ? (
            currentUserProfiles.map((user, index) => {
              return (
                <tr
                  className={`bg-gray-100 text-base text-gray-500 dark:text-gray-50 dark:bg-gray-500 ${
                    index === activeRow ? "active-row" : ""
                  }`}
                  key={user?._id}>
                  <td className="px-7 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-400 rounded-full">
                        <img className="h-10 w-10 rounded-full" src={user.profilePic} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          age: {user.age}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className=" px-7  py-6">{user?.age}</td>
                  <td className=" px-7  py-6">{user?.address}</td>
                  <td className=" px-7  py-6">
                    <Button
                      className="text-xs rounded-full"
                      onClick={(e) => {
                        deleteUser(user._id);
                      }}>
                      Delete
                    </Button>
                  </td>
                  <td className=" px-7  py-6">
                    <Button
                      className="text-xs rounded-full"
                      onClick={(e) => {
                        updateUser(user._id);
                      }}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <React.Fragment>
              {tableHeadings?.map((heading) => {
                return (
                  <tr className="text-center animate-pulse bg-gray-200" key={heading}>
                    <td colSpan={tableHeadings?.length} className="h-10"></td>
                  </tr>
                );
              })}
            </React.Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
