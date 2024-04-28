import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import { supabase } from '../constants/client';

const EditPostForm = () => {
  const { postId } = useParams(); // Assuming postId is passed through URL params
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post data based on postId when the component mounts
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();
        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTitle = formData.get('title');
    const updatedContent = formData.get('content');
    const updatedImage = formData.get('image');

    try {
      await supabase
        .from('posts')
        .update({ title: updatedTitle, content: updatedContent, image: updatedImage })
        .eq('id', postId);
      console.log('Post updated successfully!');
      window.location.href = `/`; // Redirect to home after update
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await supabase
          .from('posts')
          .delete()
          .eq('id', postId);
        console.log('Post deleted successfully!');
        window.location.href = '/'; // Redirect to home page or any other page after deletion
      } catch (error) {
        console.error('Error deleting post:', error.message);
      }
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleUpdate}>
          <label>Title:</label>
          <input type="text" name="title"  required />
          <label>Content:</label>
          <textarea name="content" required></textarea>
          <label>Image:</label>
          <input type="file" name="image" accept="image/*" />
          <button className="button-outline" type="submit">Update Post</button>
          <button className="button-outline" type="button" onClick={handleDelete}>Delete Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
