import { FiImage } from "react-icons/fi";
import { Avatar, Grid, GridItem, Wrap, WrapItem } from "@chakra-ui/react";
import PostIcon from "./postIcon";
import { RiSendPlane2Line } from "react-icons/ri";
import { API_URL } from "../helpers/api_url";
import ResizeTextarea from "react-textarea-autosize";
import { AutoResizeTextarea } from "./AutoResizeTextArea";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import { fetchPost, sendPost } from "../redux/actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const PostBox = ({ sendPost, fetchPost }) => {
  const { profilePic } = useSelector((state) => state.user);

  const [caption, setCaption] = useState("");
  const captionHandler = (e) => {
    setCaption(e.target.value);
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    console.log("click");
    hiddenFileInput.current.click();
  };

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const onFileChange = (e) => {
    console.log(e.target.files, "ini target files");
    console.log(e.target.files[0], "ini target files[0]");

    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }

    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPreview(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?
  };

  const submitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let insertData = {
      caption: caption,
    };

    formData.append(`image_url`, image);

    formData.append("data", JSON.stringify(insertData));

    try {
      if (caption.length > 300) {
        throw "Maximum 300 characters";
      }
      await sendPost(formData);
      fetchPost();
      setCaption("");
      setImage(undefined);
      setPreview(undefined);

      console.log(formData);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        color: "#f44336",
        iconColor: "#f44336",
        background: "#1a1a1d",
        title: "Oops...",
        text: error || "Network Error",
      });
    }
    console.log(formData);
  };

  return (
    <div>
      <Grid
        w="45vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={4}
        className=" p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] rounded-b-xl"
      >
        <GridItem rowSpan={3} colSpan={1}>
          {/* atas */}
          <div className="flex items-center cursor-pointer">
            <Wrap>
              <WrapItem>
                <Avatar
                  className="mr-2"
                  size="lg"
                  name=""
                  src={`http://localhost:5000/${profilePic}`}
                />
              </WrapItem>
            </Wrap>
          </div>
        </GridItem>
        <GridItem colSpan={9} rowSpan={2}>
          <AutoResizeTextarea onChange={captionHandler} value={caption} />
          {image && (
            <img className="pt-2" width={120} height={120} src={preview} />
          )}
        </GridItem>
        <GridItem colSpan={9} rowSpan={1}>
          {/* footer */}
          <div className=" flex justify-between items-center border-t-2 text-gray-400">
            <div className="rounded-none my-1 mx-16">
              <button onClick={() => handleClick()}>
                <PostIcon Icon={FiImage} />
              </button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="rounded-none my-1 mx-16">
              <button onClick={submitPost}>
                <PostIcon Icon={RiSendPlane2Line} />
              </button>
            </div>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};
export default connect(null, { sendPost, fetchPost })(PostBox);
