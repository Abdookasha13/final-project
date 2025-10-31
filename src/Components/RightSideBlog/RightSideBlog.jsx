import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./RightSideBlog.css";
import { GoSearch } from "react-icons/go";

function RightSideBlog() {
  const posts = [
    {
      id: 1,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-1.jpg",
      date: "14 June 2023",
      title: "Interdum velit laoreet id donec ultrices tincidunt arcu.",
    },
    {
      id: 2,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-2.jpg",
      date: "14 June 2023",
      title: "Interdum velit laoreet id donec ultrices tincidunt arcu.",
    },
    {
      id: 3,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-3.jpg",
      date: "14 June 2023",
      title: "Interdum velit laoreet id donec ultrices tincidunt arcu.",
    },
    {
      id: 4,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-4.jpg",
      date: "14 June 2023",
      title: "Interdum velit laoreet id donec ultrices tincidunt arcu.",
    },
    {
      id: 5,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-5.jpg",
      date: "14 June 2023",
      title: "Interdum velit laoreet id donec ultrices tincidunt arcu.",
    },
  ];

  const tags = [
    "Balance",
    "Coaching",
    "Motivation",
    "Courses",
    "Life guide",
    "Strategy",
    "Education",
    "Coach",
  ];

  const categories = [
    "Graphic Design",
    "Web Design",
    "It And Software",
    "Sales Marketing",
    "Art & Humanities",
    "Mobile Application",
  ];

  return (
    <div className="right-side-blog ps-lg-5">
      {/* Top Section */}
      <div className="right-side-blog-top">
        <div className="detailsSide">
          {/* Search Section */}
          <div className="search">
            <input className="sinput" type="text" placeholder="Search" />
            <button className="btn" type="submit">
              <GoSearch />
            </button>
          </div>

          {/* Categories Section */}
          <div className="sercat">
            <h3 className="right-side-blog-title">Service Category</h3>
            {categories.map((category, index) => (
              <div key={index} className="sidecat">
                {category}
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Center Section */}
      <div className="right-side-blog-center">
        <h3 className="right-side-blog-title">Recent Post</h3>
        <div className="right-side-blog-posts-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className="right-side-blog-post-item d-flex align-items-start"
            >
              <div className="right-side-blog-post-image">
                <a href="#">
                  <img src={post.img} alt={post.title} />
                </a>
              </div>
              <div className="right-side-blog-post-content">
                <span>
                  <i className="fa-solid fa-calendar-days"></i> {post.date}
                </span>
                <h3 className="right-side-blog-post-title">
                  <a href="#">{post.title}</a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="right-side-blog-bottom">
        <h3 className="right-side-blog-title">Popular Tags:</h3>
        <div className="right-side-blog-tags d-flex flex-wrap justify-content-between">
          {tags.map((tag, index) => (
            <a key={index} href="#">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSideBlog;
