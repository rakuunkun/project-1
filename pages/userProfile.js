import Head from "next/head";
import Header from "../components/Header";
import Post from "../components/Post";
import Sidebar from "../components/sidebar";
import { VStack } from "@chakra-ui/react";
import Profile from "../components/Profile";
import useUser from "../hooks/useUser";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../helpers/api_url";

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

  const [data, setState] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API_URL}/post/getpost`);
      setState(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
      <div className="flex align-middle justify-center ">
        {/* <Post data={data} /> */}
      </div>
    </div>
  );
}
