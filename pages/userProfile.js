import Head from "next/head";
import Header from "../components/Header";
import Post from "../components/Post";
import Sidebar from "../components/sidebar";
import { Flex, Spacer, VStack, StackDivider } from "@chakra-ui/react";
import React from "react";
import PostBox from "../components/PostBox";
import Profile from "../components/Profile";
import useUser from "../hooks/useUser";

export default function userProfile() {
  const {
    username,
    fullname,
    bio,
    profilePic,
    birthDate,
    createdAt,
    isVerified,
  } = useUser();

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
          <Profile
            username={username}
            fullname={fullname}
            bio={bio}
            profilePic={profilePic}
            birthDate={birthDate}
            createdAt={createdAt}
            isVerified={isVerified}
          />
        </VStack>
      </main>
    </div>
  );
}
