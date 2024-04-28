import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import ReadPosts from "./components/ReadPosts";
import CreatePostForm from "./components/CreatePost";
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<ReadPosts />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />

        </Routes>
      </div>
      <ButtonGradient />
    </Router>
  );
}

export default App;


