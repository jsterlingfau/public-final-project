import './CreatePost.css'
import {supabase} from '../constants/client'


const CreatePostForm = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const title = formData.get('title');
      const content = formData.get('content');
      const image = formData.get('image');
      const voteCount = 0; // Assuming voteCount starts at 0
  
      try {
        await supabase
          .from('posts')
          .insert({ title, content, image, voteCount })
          .select();
  
        // Optionally, redirect to a different page or show a success message
        console.log('Post created successfully!');
      } catch (error) {
        console.error('Error saving post to database:', error.message);
      }
    };
  
    return (
      <div>
        <div className="relative z-1 max-w-[62rem] mx-auto text center mb-[4rem] md:mb-20 lg:mb: [6rem]"></div>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" required />
          <label>Content:</label>
          <textarea name="content" required></textarea>
          <label>Image: Optional </label>
          <input type="file" name="image" accept="image/*" />
          <button className="button-outline" type="submit">Create Post</button>
        </form>
        </div>
      </div>
    );
  };
  
  export default CreatePostForm;