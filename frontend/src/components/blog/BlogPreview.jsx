import React from 'react';
import BannerSection from './BannerSection';
import TitleDescriptionSection from './TitleDescriptionSection';
import ArticlesSection from './ArticlesSection';

const BlogPreview = ({ blogData, onBlogChange }) => {
  return (
    <div className="w-full h-full bg-[var(--card-color)]">
      <BannerSection 
        bannerImage={blogData.bannerImage}
        onBannerChange={(img) => onBlogChange('bannerImage', img)}
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
      />
    </div>
  );
};

export default BlogPreview;