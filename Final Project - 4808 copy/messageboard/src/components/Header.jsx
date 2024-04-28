import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import {supabase} from "../constants/client"

const Header = ({ posts, setFilteredPosts }) => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleSearch = async (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);
  
    if (searchTerm !== "") {
      try {
        const { data: filteredPosts, error } = await supabase
          .from('posts')
          .select('*')
          .ilike('title', `%${searchTerm}%`)
          .or('content', 'ilike', `%${searchTerm}%`);
  
        if (error) {
          throw error;
        }
  
        setFilteredPosts(filteredPosts || []);
      } catch (error) {
        console.error('Error filtering posts:', error.message);
      }
    } else {
      // If search term is empty, reset filtered posts to show all posts
      setFilteredPosts(posts);
    }
  };
  

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        
        <Link to="/"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          <a>Home</a>
        </Link>
        
        <Link to="/create-post" className="hidden lg:flex">
          <Button>Create New Post</Button>
        </Link>

        <div className="ml-auto lg:flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search posts"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

