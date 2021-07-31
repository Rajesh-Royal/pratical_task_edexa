import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Hash, Image, Mail, User, XCircle } from "react-feather";
import { toast } from "react-toastify";
import { projectTheme } from "../../../Config/ProjectTheme";
import { USER_PROFILE_CREATE } from "../../../core/gql-operations/mutation/user-profile-create.mutation";
import { USER_PROFILE_UPDATE } from "../../../core/gql-operations/mutation/user-profile-update-mutation";
import { validateUserAge } from "../../../Util/UtilityFunctions";
import Button from "../../common/Button";
import FormInputBox from "../../common/FormInputBox";
import { SectionHeading } from "../../common/Typography";

const AddNewUserProfileForm = ({
  userProfileData,
  onProfileDataChange,
  closeAddUserProfileModal,
  formHeading,
  type,
}) => {
  const [addNewUserProfile] = useMutation(USER_PROFILE_CREATE);
  const [updateUserProfile] = useMutation(USER_PROFILE_UPDATE);

  const [requestLoading, setRequestLoading] = useState(false);

  return (
    <form
      onClick={(e) => e.preventDefault()}
      className="shadow-md border border-gray-100 p-6 bg-gray-50 dark:bg-gray-600 dark:border-gray-600 max-w-3xl relative overflow-hidden">
      <button
        className="absolute right-2 -mt-12 focus:outline-none"
        onClick={() => {
          closeAddUserProfileModal();
        }}>
        <XCircle className={`mt-8 w-8 h-8 ${projectTheme.closeXButtonColor}`} aria-hidden="true" />
      </button>
      <SectionHeading>{formHeading}</SectionHeading>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        <FormInputBox
          label="Full Name"
          icon={<User />}
          placeholder="Name"
          name="name"
          type="text"
          ariaLabel="Fullname"
          value={userProfileData?.name}
          onChange={(e) => {
            onProfileDataChange(e);
          }}
        />
        <FormInputBox
          label="Profile Picture"
          icon={<Image />}
          placeholder="Profile Picture"
          name="profilePic"
          type="text"
          ariaLabel="ProfilePicture"
          value={userProfileData?.profilePic}
          onChange={(e) => {
            onProfileDataChange(e);
          }}
        />
        <FormInputBox
          label="Address"
          icon={<Mail />}
          placeholder="Address"
          name="address"
          type="text"
          ariaLabel="User Address"
          value={userProfileData?.address}
          onChange={(e) => {
            onProfileDataChange(e);
          }}
        />
        <FormInputBox
          label="Age"
          icon={<Hash />}
          placeholder="Age"
          name="age"
          type="number"
          ariaLabel="Age"
          value={userProfileData?.age}
          onChange={(e) => {
            onProfileDataChange(e);
          }}
        />
        <div className="flex flex-col items-center justify-end mt-8">
          {type === "create" ? (
            <Button
              className=" w-full"
              onClick={() => {
                if (!validateUserAge(userProfileData?.age)) {
                  toast.error("Please enter a valid age");
                  return 0;
                }
                setRequestLoading(true);
                addNewUserProfile({
                  variables: userProfileData,
                  refetchQueries: ["ReadUserProfiles"],
                })
                  .then((res) => {
                    setRequestLoading(false);
                    if (res?.data?.CreateUserProfile?._id) {
                      toast.success("New User Profile Added");
                    }
                  })
                  .catch((error) => {
                    setRequestLoading(false);
                    toast.error(error?.message);
                  });
              }}
              isLoading={requestLoading}>
              Save
            </Button>
          ) : (
            <Button
              className=" w-full"
              onClick={() => {
                if (!validateUserAge(userProfileData?.age)) {
                  toast.error("Please enter a valid age");
                  return 0;
                }
                setRequestLoading(true);
                updateUserProfile({
                  variables: userProfileData,
                  refetchQueries: ["ReadUserProfiles"],
                })
                  .then((res) => {
                    setRequestLoading(false);
                    toast.success("User Profile Updated");
                  })
                  .catch((error) => {
                    setRequestLoading(false);
                    toast.error(error?.message);
                  });
              }}
              isLoading={requestLoading}>
              Update
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddNewUserProfileForm;
