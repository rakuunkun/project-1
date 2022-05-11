import { useEffect } from "react";
import { API_URL } from "../helpers/api_url";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart, AiFillEdit } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import Header from "./Header";

const Postdetail = ({
  data,
  username,
  isVerified,
  profilePic,
  updatePost,
  deletePost,
  addLikes,
  commentsData,
  insertComment,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mapInitialState = () => {
    const data2 = data.map((val) => {
      return val.caption;
    });
    setInput({ ...input, caption: data2[0] });

    onOpen();
  };

  const [input, setInput] = useState({
    caption: "",
  });

  const [inputComment, setinputComment] = useState({
    comment: "",
  });

  const [characters, setCharacters] = useState(inputComment.comment.length);

  useEffect(() => {
    setCharacters(inputComment.comment.length);
  }, [inputComment]);

  const handleClick = async (e) => {
    // setlikesB(!likesB)
    e.preventDefault();
    try {
      await addLikes();
    } catch (error) {
      console.log(error);
    }
    // await fetchDataUserDetail()
  };

  const [selectedImage, setselectedImage] = useState([]);

  const onFileChange = (e) => {
    console.log(e.target.files, "ini target files");
    console.log(e.target.files[0], "ini target files[0]");

    if (e.target.files[0]) {
      setselectedImage([...selectedImage, e.target.files[0]]);
    }
  };

  const inputPostHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const inputCommentHandler = (e) => {
    setinputComment({ ...inputComment, [e.target.name]: e.target.value });
    console.log(inputComment.comment.length);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    let insertinputComment = {
      comment: inputComment.comment,
    };
    try {
      if (insertinputComment.comment.length > 300) {
        throw "Maximum 300 characters";
      }

      insertComment(insertinputComment);

      await Swal.fire("Reply sent!", "", "success");

      setinputComment({ ...input, comment: "" });
    } catch (error) {
      console.log(error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Network Error",
      });
    }
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      await deletePost();
    } catch (error) {
      console.log(error);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    // let insertData = {
    //   caption: input.caption,
    // };

    try {
      //   await updatePost(insertData);

      let token = Cookies.get("token");
      await axios.patch(
        `${API_URL}/post/editpostcaptionimage/${postID}`,
        { caption: input.caption },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // await fetchDataUserDetail()
      console.log(input.caption, "ini caption");
      await Swal.fire("Post successfully changed!", "", "success");

      setInput({ ...input, caption: "" });

      console.log(insertData, "ini insertdata");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "Network Error",
      });
    }
    console.log(insertData);
  };

  const [commentsCounts, setCommentsCounts] = useState(5);

  const more = () => {
    setCommentsCounts(commentsData.length);
  };

  const less = () => {
    setCommentsCounts(5);
  };

  const commentsFirstRender = () => {
    return commentsData.slice(0, commentsCounts).map((val, index) => {
      return (
        <div key={index} className="py-4 pl-8 border-b-2 ">
          <div className="flex gap-3 items-center">
            <Avatar
              className="object-cover w-10 h-10 rounded-full"
              src={`${API_URL}${val.profilePic}`}
              alt=""
            />
            <div>@{val.username}</div>
            <div>- {moment(val.created_at).fromNow()}</div>
          </div>
          <div className="pt-2 mr-8 pl-14">{val.comment}</div>
        </div>
      );
    });
  };

  const renderData = () => {
    return data.map((val, index) => {
      return (
        <div
          key={index}
          className="border-b-2 flex pb-4 pl-6 pt-2 hover: duration-700 mt-4"
        >
          <div className="min-w-fit">
            <a href="">
              {val.profilePic ? (
                <Avatar
                  src={`${API_URL}${val.profilePic}`}
                  alt=""
                  className="object-cover w-14 h-14 rounded-full"
                />
              ) : (
                <Avatar
                  src={`${API_URL}/photos/defaultcoverimage.png`}
                  alt=""
                  className="object-cover w-14 h-14 rounded-full"
                />
              )}
            </a>
          </div>
          <div className=" flex flex-col pl-3 w-10/12">
            <div className="flex space-x-2">
              <div>{val.fullname}</div>
              <div>@{val.username}</div>
              {/* <div>- {val.created_at}</div> */}
            </div>
            <div className="pt-2 text-lg">{val.caption}</div>

            <div className="pt-2 text-lg pr-6"></div>
            <div className="pt-4 flex justify-between items-center h-4">
              {username == val.username ? (
                <button
                  onClick={mapInitialState}
                  className="text-lg hover:scale-150 duration-700"
                >
                  <AiFillEdit />
                </button>
              ) : null}

              {val.alreadyliked ? (
                <button
                  onClick={(e) => handleClick(e)}
                  className="text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2"
                >
                  {val.likes ? <span>{val.likes}</span> : null}
                  <AiFillHeart />
                </button>
              ) : (
                <button
                  onClick={(e) => handleClick(e)}
                  className="text-lg hover:scale-150 duration-700 flex items-center gap-2"
                >
                  {val.likes ? <span>{val.likes}</span> : null}
                  <AiOutlineHeart />
                </button>
              )}

              <button className="text-lg hover:scale-150 duration-700">
                <FiShare />
              </button>
              {username == val.username ? (
                <button
                  onClick={(e) => handleDeletePost(e)}
                  className="text-lg hover:scale-150 hover:text-red-500 duration-700"
                >
                  <IoClose />
                </button>
              ) : null}
            </div>
          </div>
          <div className="mr-5 w-fit">
            <button className="">
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Header />
      {renderData()}
      <div className="pl-8 pt-4 border-b-2  pb-4">
        <div className="flex items-center gap-3">
          <Avatar
            className="object-cover w-10 h-10 rounded-full"
            src={`${API_URL}${profilePic}`}
            alt=""
          />
          <div>@{username}</div>
        </div>
        <div className="flex justify-between items-center">
          {isVerified == 0 ? (
            <textarea
              disabled
              onChange={inputCommentHandler}
              value={inputComment.comment}
              className="resize-none bg-white  focus:outline-none pt-1"
              name="comment"
              rows="1"
              cols="48"
              placeholder="Post your reply..."
            ></textarea>
          ) : (
            <textarea
              onChange={inputCommentHandler}
              value={inputComment.comment}
              className="resize-none bg-white focus:outline-none pt-1"
              name="comment"
              rows="1"
              cols="48"
              placeholder="Post your reply..."
            ></textarea>
          )}

          {isVerified == 0 ? (
            <button
              disabled
              onClick={submitComment}
              className="  rounded-full py-2 mr-8 px-3 text-base"
            >
              Reply
            </button>
          ) : (
            <button
              onClick={submitComment}
              className="  rounded-full py-2 mr-8 px-3 text-base hover: duration-700"
            >
              Reply
            </button>
          )}
        </div>

        {inputComment.comment.length === 0 ? null : null}

        {inputComment.comment.length > 0 &&
        inputComment.comment.length <= 300 ? (
          <div className=" text-sm">{characters} / 300</div>
        ) : null}

        {inputComment.comment.length > 300 ? (
          <div className="text-red-500 text-sm">
            {characters} / 300 characters limit exceeded
          </div>
        ) : null}
      </div>
      {/* {renderComment()} */}
      {commentsFirstRender()}
      {commentsData.length > 5 && commentsCounts == 5 ? (
        <div
          onClick={() => more()}
          className="hover: duration-500 grid justify-center py-2 hover:cursor-pointer"
        >
          More comments...
        </div>
      ) : null}

      {commentsCounts == commentsData.length ? (
        <div
          onClick={() => less()}
          className="hover: duration-500 grid justify-center py-2 hover:cursor-pointer"
        >
          Less comments...
        </div>
      ) : null}

      <Modal size="sm" isOpen={isOpen} onClose={onClose} roundedTop="3xl">
        <ModalOverlay />
        <form onSubmit={submitPost}>
          <ModalContent>
            <ModalHeader bg="" display="flex" justifyContent="space-between">
              <button
                className="bg- rounded-full py-2 px-3 text-base  hover: duration-700"
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="  rounded-full py-2 px-3 text-base hover: duration-700"
                type="submit"
              >
                Edit Post
              </button>
            </ModalHeader>

            <ModalBody className=" bg-">
              <div className="flex gap-4">
                <Avatar
                  className="rounded-full w-10 h-10 object-cover"
                  src={`${API_URL}${profilePic}`}
                  alt=""
                />
                <textarea
                  onChange={inputPostHandler}
                  name="caption"
                  value={input.caption}
                  className="pt-1 focus:outline-none bg-  resize-none"
                  cols="36"
                  rows="3"
                  placeholder="What's happening..."
                ></textarea>
              </div>
              <div className="mr-5 grid grid-cols-4 gap-2">
                {selectedImage.map((val, index) => {
                  return (
                    <div className="relative" key={index}>
                      <img
                        src={URL.createObjectURL(val)}
                        alt=""
                        className="rounded-xl object-cover w-full h-40"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setselectedImage(
                            selectedImage.filter((e) => e !== val)
                          );
                        }}
                        className="absolute top-1 left-1 p-1 bg- rounded-full bg-opacity-60  hover: hover:bg-opacity-60 duration-500"
                      >
                        <IoClose />
                      </button>
                    </div>
                  );
                })}
              </div>
            </ModalBody>

            <ModalFooter className="bg-">
              <label
                className="  rounded-full py-2 px-3 text-base hover: duration-700 cursor-pointer"
                for="inputPic"
              >
                Add Photos
              </label>
              <input
                onChange={onFileChange}
                className="hidden"
                type="file"
                id="inputPic"
              />
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default Postdetail;
