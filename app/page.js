"use client";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import React from "react";
import HomeProducts from "@/components/Products";
import FeaturedProduct from "@/components/FeaturedProduct";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
    <Navbar/>
     <div className="px-6 md:px-16 lg:px-32">
      <Header/>
      <HomeProducts/>
       <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
}

export default Home;