import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { USER_PROFILE_DELETE } from "../../core/gql-operations/mutation/user-profile-delete-mutation";
import { modalStyle } from "../../Util/ModalStyle";
import Button from "../common/Button";
import AddNewUserProfileForm from "./components/AddNewUserProfileForm";

const UserTable = ({ loading, data, activeRow, currentUserProfiles }) => {
  const tableHeadings = ["Name", "age", "address", "Delete", "Update"];
  const [deleteUserProfile] = useMutation(USER_PROFILE_DELETE);

  // user update form logic starts
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    _id: "",
    name: "",
    profilePic: "",
    address: "",
    age: "",
  });

  //   update state on Input change
  const onProfileDataChange = (e) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.name === "age" ? parseInt(e.target.value) || "" : e.target.value,
    });
  };
  // closeModal
  const closeAddUserProfileModal = () => setModalIsOpen(false);

  // user update profile form logic ends
  return (
    <React.Fragment>
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
                          deleteUserProfile({
                            variables: {
                              userId: user?._id,
                            },
                            refetchQueries: ["ReadUserProfiles"],
                          })
                            .then(() => {
                              toast.success("user profile deleted successfully");
                            })
                            .catch((error) => {
                              toast.error(error.message);
                            });
                        }}>
                        Delete
                      </Button>
                    </td>
                    <td className=" px-7  py-6">
                      <Button
                        className="text-xs rounded-full"
                        onClick={(e) => {
                          setModalIsOpen(true);
                          setUserProfileData(user);
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        style={modalStyle}
        contentLabel="Add User Profile Modal">
        <AddNewUserProfileForm
          userProfileData={userProfileData}
          onProfileDataChange={onProfileDataChange}
          closeAddUserProfileModal={closeAddUserProfileModal}
          formHeading={"Update user Profile"}
          type="update"
        />
      </Modal>
    </React.Fragment>
  );
};

export default UserTable;
