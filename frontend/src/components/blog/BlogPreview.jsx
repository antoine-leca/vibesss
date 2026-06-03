import React from 'react';
import BannerSection from './BannerSection';
import TitleDescriptionSection from './TitleDescriptionSection';
import ArticlesSection from './ArticlesSection';

const BlogPreview = ({ blogData, onBlogChange, onThemeSelectorToggle, onPublish }) => {
  return (
    <div className="w-full h-full bg-white">
      <BannerSection 
        bannerImage={blogData.bannerImage}
        onBannerChange={(img) => onBlogChange('bannerImage', img)}
        onThemeSelectorToggle={onThemeSelectorToggle}
      />
      
      <TitleDescriptionSection
        title={blogData.title}
        description={blogData.description}
        onTitleChange={(val) => onBlogChange('title', val)}
        onDescriptionChange={(val) => onBlogChange('description', val)}
      />
      
      <ArticlesSection
        backgroundColor={blogData.backgroundcolor}
        onColorChange={(color) => onBlogChange('backgroundcolor', color)}
        blogTitle={blogData.title}
        onPublish={onPublish}
      />
    </div>
  );
};

export default BlogPreview;