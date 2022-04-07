import { FiImage } from "react-icons/fi";
import { Grid, GridItem } from "@chakra-ui/react";
import PostIcon from "./postIcon";
import { RiSendPlane2Line } from "react-icons/ri";

import ResizeTextarea from "react-textarea-autosize";
import { AutoResizeTextarea } from "./AutoResizeTextArea";
const PostBox = () => {
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
          {/* leading */}
          <div className="flex items-center">
            <img
              className="rounded-full"
              width={40}
              height={40}
              src="https://bit.ly/dan-abramov"
            />
          </div>
        </GridItem>
        <GridItem colSpan={9} rowSpan={2}>
          <AutoResizeTextarea />
        </GridItem>
        <GridItem colSpan={9} rowSpan={1}>
          {/* footer */}
          <div className=" flex justify-between items-center border-t-2 text-gray-400">
            <div className="rounded-none my-1 mx-16">
              <PostIcon Icon={FiImage} />
            </div>
            <div className="rounded-none my-1 mx-16">
              <PostIcon Icon={RiSendPlane2Line} />
            </div>
          </div>
        </GridItem>
      </Grid>
      {/* <div className=" "></div> */}
    </div>
  );
};
export default PostBox;
