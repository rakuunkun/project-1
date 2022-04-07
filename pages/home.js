import Head from "next/head";
import Header from "../components/Header";
import Post from "../components/Post";
import Sidebar from "../components/sidebar";
import { Flex, Spacer, VStack, StackDivider } from "@chakra-ui/react";
import React from "react";
import PostBox from "../components/PostBox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BeanBean</title>
      </Head>
      <Header />
      <main className="flex align-middle justify-center ">
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <VStack>
          <PostBox />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </VStack>
        {/* widgets */}
      </main>
    </div>
  );
}
