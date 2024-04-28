import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../constants/client';
import "./PostPage.css"
import { heroIcons } from '../constants/index'; // Import your hero icons
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();
        if (error) {
          throw error;
        }
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    }

    async function fetchComments() {
      try {
        const { data: comments, error } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postId);
        if (error) {
          throw error;
        }
        setComments(comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    }

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, text: newComment, author: 'Anonymous' }]);
      if (error) {
        throw error;
      }
      setComments([...comments, data[0]]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleUpvote = async () => {
    try {
      await supabase
        .from('posts')
        .update({ voteCount: post.voteCount + 1 })
        .eq('id', postId);
      setPost(prevPost => ({ ...prevPost, voteCount: prevPost.voteCount + 1 }));
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container relative">
      <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" />} 

        <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
        <p>Upvotes: {post.voteCount}</p> {/* Display vote count */}


        <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
        <button className="button-outline" onClick={handleUpvote}>Upvote</button> {/* Upvote button */}
        <div className="post-icons">
          {heroIcons.map((icon, index) => (
            <li className="p-5" key={index}>
              <Link to={`/edit-post/${postId}`}>
                <img src={icon} width={24} height={25} alt={icon} />
              </Link>
            </li>
          ))}
        </div>
        </div>
        </div>
      </div>

      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
        <div className="comments">
          <h2>Comments</h2>
          <div className="container relative">
            <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
            {comments.map(comment => (
              <div key={comment.id} className="comment-card">
                <p>{comment.text}</p>
                <p>By: {comment.author}</p>
              </div>
            ))}
            <div className="comment-form">
              <h3>Add a Comment</h3>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your comment here..."
                  rows={4}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
