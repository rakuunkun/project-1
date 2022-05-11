import { IoClose } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { API_URL } from "../helpers/api_url";
import Swal from "sweetalert2";
import { editProfile, editProfilePhoto } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import React, { useState } from "react";
// import moment from "moment";
import Link from "next/link";

const Profile = ({
  username,
  fullname,
  bio,
  profilePic,
  editProfile,
  editProfilePhoto,
  email,
}) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenPhoto,
    onOpen: onOpenPhoto,
    onClose: onClosePhoto,
  } = useDisclosure();

  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

  const [isActive, setActive] = useState(true);
  const formik = useFormik({
    initialValues: {
      fullname: fullname,
      username: username,
      bio: bio,
      email: email,
    },

    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(8, "Name can't be blank")
        .max(45, "Name exceeds limit")
        .required("Name can't be blank"),
      username: Yup.string().min(8, "Minimum 8 characters"),
    }),

    onSubmit: async (values) => {
      try {
        editProfile(values);
        onClose();
      } catch (error) {
        console.log(error);
        router.push("/userProfile");
      }
    },
  });
  const closeModalEditProfile = () => {
    formik.setValues(formik.initialValues);
    onClose();
  };
  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setselectedImage({
        ...selectedImage,
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const submitPhoto = async () => {
    try {
      // let token = Cookies.get("token");
      let formData = new FormData();
      formData.append("profilePic", selectedImage.file);

      if (selectedImage.file.length == 0) {
        onClosePhoto();
        throw "Please select images to submit!";
      } else if (selectedImage.file.length == 0) {
        onClosePhoto();
        throw "Please select profile picture!";
      } else {
        await editProfilePhoto({ formData });
        setselectedImage({ ...selectedImage, file: [] });
        onClosePhoto();
      }
      await Swal.fire("Successfully changed pictures!", "YAY!", "success");
    } catch (error) {
      console.log(error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Network Error",
      });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] ">
        {/* header */}
        <div className="flex items-center justify-between space-x-2">
          <Wrap>
            <WrapItem>
              <Avatar
                className="mr-2"
                size="2xl"
                name=""
                src={`http://localhost:5000/${profilePic}`}
              />
            </WrapItem>
          </Wrap>
          <button className="pt-5 text-right" onClick={onOpenPhoto}>
            Edit Foto
          </button>
        </div>
        {/* content */}
        <div className="flex justify-between">
          <div className="pt-5 text-lg font-bold">@{username}</div>
          <button className="pt-5 text-right" onClick={onOpen}>
            Edit Profil
          </button>
        </div>
        <div className="pt-2">{fullname}</div>
        <div className="pt-2">{bio}</div>
        <div className="pt-2">{email}</div>
      </div>

      {/* profpic modal  */}
      <Modal
        size="lg"
        isOpen={isOpenPhoto}
        onClose={onClosePhoto}
        color="black"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader className="  backdrop-blur-lg flex font-thin items-center w-full gap-4 text-lg">
            <button
              onClick={onClosePhoto}
              type="button"
              className="w-1/6 rounded-full"
            >
              <div className="hover: w-fit p-2 rounded-full text-2xl duration-700">
                <IoClose />
              </div>
            </button>
            <div className="w-4/6 text-left font-thin">Edit Photos</div>
            <button onClick={submitPhoto} className="w-1/4 grid justify-center">
              <div className=" w-fit py-1 px-3 hover: duration-700 rounded-full">
                Save
              </div>
            </button>
          </ModalHeader>

          <ModalBody className="flex flex-col gap-2 mb-14  ">
            <div className="pt-20 pl-10 ">
              <div className="relative">
                <div className="absolute -bottom-8 left-6">
                  {profilePic && selectedImage.filePreview ? (
                    <img
                      src={selectedImage.filePreview}
                      alt=""
                      className="object-cover w-28 h-28 ring-4 rounded-full ring-"
                    />
                  ) : null}

                  {!profilePic && selectedImage.filePreview ? (
                    <img
                      src={selectedImage.filePreview}
                      alt=""
                      className="object-cover w-28 h-28 ring-4 rounded-full ring-"
                    />
                  ) : null}

                  {profilePic && !selectedImage.filePreview ? (
                    <img
                      src={`${API_URL}${profilePic}`}
                      alt=""
                      className="object-cover w-28 h-28 ring-4 rounded-full ring-"
                    />
                  ) : null}

                  {!profilePic && !selectedImage.filePreview ? (
                    <img
                      src={`${API_URL}/photos/default.jpg`}
                      alt=""
                      className="object-cover w-28 h-28 ring-4 rounded-full ring-"
                    />
                  ) : null}
                </div>
                <input
                  className="hidden"
                  type="file"
                  id="profilePic"
                  onChange={onFileChange}
                />
                <label
                  for="profilePic"
                  type="button"
                  className="absolute left-24  text-3xl  hover: hover:cursor-pointer duration-700 rounded-full p-1 bg-opacity-60 "
                >
                  <IoAddCircleOutline />
                </label>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* modal */}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} color="black">
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader className="  backdrop-blur-lg flex font-thin items-center w-full gap-4 text-lg">
              <button
                onClick={closeModalEditProfile}
                type="button"
                className="w-1/6 rounded-full"
              >
                <div className="hover: w-fit p-2 rounded-full text-2xl duration-700">
                  <IoClose />
                </div>
              </button>
              <div className="w-4/6 text-left font-thin">Edit Details</div>
              {formik.values.fullname == fullname &&
              formik.values.username == username &&
              formik.values.bio == bio ? (
                <button
                  type="submit"
                  disabled
                  className="w-1/4 grid justify-center"
                >
                  <div className=" w-fit py-1 px-3 rounded-full">Save</div>
                </button>
              ) : (
                <button type="submit" className="w-1/4 grid justify-center">
                  <div className=" w-fit py-1 px-3 hover: duration-700 rounded-full">
                    Save
                  </div>
                </button>
              )}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 ">
              <div className=" w-full p-2 border-2  rounded-xl">
                <div className="text-base">Username</div>
                <input
                  className="w-full  focus:outline-none  text-xl font-bold tracking-wider"
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </div>
              <div className=" p-2 w-full border-2  rounded-xl">
                <div className="text-base">Fullname</div>
                <input
                  className="w-full  focus:outline-none  text-xl font-bold tracking-wider"
                  type="text"
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
              </div>

              {formik.touched.fullname && formik.errors.fullname ? (
                <p className="text-sm ml-3 text-pinktertiary font-bold">
                  {formik.errors.fullname}
                </p>
              ) : null}

              {formik.touched.username && formik.errors.username ? (
                <p className="text-sm ml-3 text-pinktertiary font-bold">
                  {formik.errors.username}
                </p>
              ) : null}

              <div className=" w-full p-2 border-2  rounded-xl">
                <div className="text-base">Bio</div>
                <input
                  className="w-full  focus:outline-none  text-xl font-bold tracking-wider"
                  type="text"
                  name="bio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bio}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};
export default connect(null, { editProfile, editProfilePhoto })(Profile);
