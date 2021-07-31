import React, { useState } from "react";
import { UserPlus } from "react-feather";
import Modal from "react-modal";
import { modalStyle } from "../../../Util/ModalStyle";
import Button from "../../common/Button";
import AddNewUserProfileForm from "./AddNewUserProfileForm";

const AddNewUserProfileButton = () => {
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
  return (
    <React.Fragment>
      <div className="flex justify-between items-center my-4 fixed bottom-3 left-5 rounded-full">
        <Button
          onClick={() => {
            setModalIsOpen(true);
            setUserProfileData({});
          }}
          className="rounded-full pt-5 pb-5">
          <UserPlus />
        </Button>
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
          formHeading={"Add a New User Profile"}
          type="create"
        />
      </Modal>
    </React.Fragment>
  );
};

export default AddNewUserProfileButton;
