import React from 'react';

import "./PostCard.css"

const PostCard = ({ post }) => {

  const calculateHoursSincePost = (created_at) => {
    const currentTime = new Date();
    const createdTime = new Date(created_at);
    const timeDifference = Math.abs(currentTime - createdTime);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference;
  };

  return (
    <div className="post-card">
      <p>Posted {calculateHoursSincePost(post.created_at)} Hours Ago</p>
      <h2>{post.title}</h2>
      <p>Upvotes: {post.voteCount}</p>
    </div>
  );
}

export default PostCard;
