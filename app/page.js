"use client";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import React from "react";
import HomeProducts from "@/components/Products";

const Home = () => {
  return (
    <>
    <Navbar/>
     <div className="px-6 md:px-16 lg:px-32">
      <Header/>
      <HomeProducts/>
     </div>
    </>
  );
}

export default Home;