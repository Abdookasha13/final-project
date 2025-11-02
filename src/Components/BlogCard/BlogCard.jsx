import React from 'react';
import './BlogCard.css' 

const BlogCard = ({ imgSrc, date, comments, title }) => {  
  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
        <div className="it-blog-item">
          <div className="it-blog-thumb">
            <a href="#">
              <img src={imgSrc || "https://ordainit.com/html/educate/assets/img/blog/blog-1-1.jpg"} alt="blog" />  {}
            </a>
          </div>
          <div className="it-blog-content">
            <div className="it-blog-meta">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                {date || "14 June 2023"}
              </span>
              <span>
                <i className="fa-solid fa-message"></i>
                {comments || "Comment (06)"}
              </span>
            </div>
            <h4 className="it-blog-title">
              <a href="#">
                {title || "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat"}
              </a>
            </h4>
            <a className="it-btn" href="#">
              <span>Read More</span>
              <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1.24023L16 7.24023L11 13.2402" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M1 7.24023H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bootstrap CSS */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet" />
      {/* FontAwesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </>
  );
};

export default BlogCard;