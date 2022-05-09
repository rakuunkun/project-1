import { color, Icon } from "@chakra-ui/react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";
import PostIcon from "./postIcon";

const Post = ({ data }) => {
  const renderData = () => {
    return data.map((val, index) => {
      return (
        <div key={index} className="flex flex-col">
          <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] ">
            {/* header */}
            <div className="flex items-center space-x-2">
              <img
                className="rounded-full "
                width={40}
                height={40}
                src={`http://localhost:5000/${val.profilePic}`}
              />
              <div>
                <div className="font-medium">{val.username}</div>
                <div className="text-xs text-gray-400">jam xx xx</div>
              </div>
            </div>
            {/* content */}
            <div className="pt-5">{val.caption}</div>
            <div className="pt-5">
              {" "}
              <img
                className=""
                width={60}
                height={60}
                src={`http://localhost:5000/${val.image_url}`}
              />
            </div>
          </div>
          {/* footer */}
          <div className=" flex justify-center items-center rounded-b-xl bg-white shadow-md text-gray-400 border-t">
            <div className="rounded-none my-1 mx-16">
              <PostIcon Icon={FaRegComment} />
            </div>
            <div className="rounded-none my-1 mx-16">
              <PostIcon Icon={FaRegHeart} />
            </div>

            <div className="rounded-none my-1 mx-16">
              <PostIcon Icon={FiShare2} />
            </div>
          </div>
        </div>
      );
    });
  };
  return <div>{renderData()}</div>;
};

export default Post;
