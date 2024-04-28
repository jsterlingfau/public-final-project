import React, { useState, useEffect } from 'react';
import Section from "./Section";
import { curve } from "../assets";
import { supabase } from '../constants/client';
import PostCard from './PostCard'; // Import the PostCard component

import {Link} from "react-router-dom";

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
          throw error;
        }
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    }
    fetchPosts();
  }, []);

// Function to fetch posts sorted by most recent
const fetchMostRecentPosts = async () => {
  try {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) {
      throw error;
    }
    setPosts(data || []);
  } catch (error) {
    console.error('Error fetching most recent posts:', error.message);
  }
};

// Function to fetch posts sorted by most upvotes
const fetchMostUpvotedPosts = async () => {
  try {
    const { data, error } = await supabase.from('posts').select('*').order('voteCount', { ascending: false });
    if (error) {
      throw error;
    }
    setPosts(data || []);
  } catch (error) {
    console.error('Error fetching most upvoted posts:', error.message);
  }
};



  return (
    <Section
      className="pt-[12rem] -mt-[5.25]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="read-post"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
        <h1 className="h1 mb-6">
          Join The Conversation {` `}
          <span className="inline-block relative">Brainwave {" "} <img 
            src={curve} 
            className="absolute top-full left-0 w-full xl:-mt-2"
            width={624}
            height={28}
            alt="Curve" 
          />
          </span>
        </h1>
        <div className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
        <div className="flex justify-center mb-4">
            <button onClick={fetchMostRecentPosts} className="mr-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">Most Recent</button>
            <button onClick={fetchMostUpvotedPosts} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">Most Upvoted</button>
          </div>
          {posts.length > 0 ? (
            <div className="post-cards">
              {posts.map(post => (
               <Link key={post.id} to={`/posts/${post.id}`}>
               <PostCard post={post} />
             </Link>
              ))}
            </div>
          ) : (
            <p>No New Post Yet.</p>
          )}
        </div>
      </div>
    </Section>
  );
}

export default ReadPosts;
