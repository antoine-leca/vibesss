import React from 'react';
import BlogEditorContainer from '../components/blog/BlogEditorContainer';

const CreateBlog = () => {
  return (
    <div className="w-full h-screen bg-[#FBF7EE] sm:bg-gradient-to-r sm:from-[#FBC3D1] sm:from-50% sm:to-[#8CD6DC] sm:to-50% flex flex-col items-center font-sans sm:pt-12 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col h-full sm:h-[calc(100vh-6rem)] px-0 sm:px-20">
        <BlogEditorContainer />
      </div>
    </div>
  );
};

export default CreateBlog;