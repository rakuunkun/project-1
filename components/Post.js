import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import PostIcon from "./postIcon";
import { fetchPost } from "../redux/actions";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";

const Post = ({ fetchPost }) => {
  useEffect(() => {
    fetchPost();
  }, []);

  const { data } = useSelector((state) => state.post);
  const renderData = (data) => {
    console.log(data);
    if (!data) {
      return <div>Loading...</div>;
    }

    return data.map((val, index) => {
      return (
        <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
          <div key={index} className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl min-w-[45vh] ">
              {/* header */}
              <div className="flex items-center space-x-2">
                <Wrap>
                  <WrapItem>
                    <Avatar
                      className="mr-2"
                      size="md"
                      name=""
                      src={`http://localhost:5000/${val.profilePic}`}
                    />
                  </WrapItem>
                </Wrap>
                <div>
                  <div className="font-medium">{val.username}</div>
                  <div className="text-xs text-gray-400">
                    {moment(val.created_at).fromNow()}
                  </div>
                </div>
              </div>
              {/* content */}
              <div className="pt-5">{val.caption}</div>
              <div className="pt-5">
                {" "}
                {val.image_url ? (
                  <img
                    className=""
                    width={120}
                    height={120}
                    src={`http://localhost:5000/${val.image_url}`}
                  />
                ) : (
                  <span />
                )}
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
        </Link>
      );
    });
  };
  return <div>{renderData(data)}</div>;
};

export default connect(null, { fetchPost })(Post);
