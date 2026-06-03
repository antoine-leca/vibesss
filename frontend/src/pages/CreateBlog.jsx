import React from 'react';
import BlogEditorContainer from '../components/blog/BlogEditorContainer';

const CreateBlog = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <BlogEditorContainer />
      </div>
    </div>
  );
};

export default CreateBlog;