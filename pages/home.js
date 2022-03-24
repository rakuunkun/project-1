// import { Link } from "@mui/material";
import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Login from "./login";
import Post from "../components/Post";
import Button from "../components/button";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kaktus</title>
      </Head>
      <Header />
      <main className="flex align-middle justify-center ">
        {/* sidebar */}
        asade
        {/* feed */}
        <Post />
        {/* widgets */}
        <Button url="/login" name="Login" />
        <Button url="/register" name="Register" />
      </main>
    </div>
  );
}
