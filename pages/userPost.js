import Head from "next/head";
import Header from "../components/Header";
import Post from "../components/Post";
import Sidebar from "../components/sidebar";
import { VStack } from "@chakra-ui/react";
import React from "react";
import PostBox from "../components/PostBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../helpers/api_url";

export default function userPost() {
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
          <PostBox />
          <Post data={data} />
        </VStack>
        {/* widgets */}
      </main>
    </div>
  );
}

// belom dipake
