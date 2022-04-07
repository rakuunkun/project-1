import { color, Icon } from "@chakra-ui/react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";
import PostIcon from "./postIcon";
const Post = () => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] ">
        {/* header */}
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            width={40}
            height={40}
            src="https://bit.ly/dan-abramov"
          />
          <div>
            <p className="font-medium">ampoc</p>
            <p className="text-xs text-gray-400">jam xx xx</p>
          </div>
        </div>
        {/* content */}
        <p className="pt-5">isi konten</p>
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
};
export default Post;
