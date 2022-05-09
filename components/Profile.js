import { color, Icon } from "@chakra-ui/react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";
import PostIcon from "./postIcon";
import Post from "../components/Post";
const Profile = ({ username, fullname, bio, profilePic }) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] ">
        {/* header */}
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            width={150}
            height={150}
            src={`http://localhost:5000/${profilePic}`}
          />
        </div>
        {/* content */}
        <div className="pt-5">{username}</div>
        <div className="flex justify-between">
          <div className="pt-5">{fullname}</div>
          <div className="pt-5 text-right">Edit Profil</div>
        </div>
        <div className="pt-5">{bio}</div>
      </div>
      {/* footer */}

      {/* <Post /> */}
    </div>
  );
};
export default Profile;
