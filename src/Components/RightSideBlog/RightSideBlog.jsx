import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useTranslation } from "react-i18next";
import "./RightSideBlog.css";

function RightSideBlog() {
  const { t } = useTranslation();
  const posts = t("rightBlog.posts", { returnObjects: true });
  const tags = t("rightBlog.tags", { returnObjects: true });
  const categories = t("rightBlog.categories", { returnObjects: true });

  return (
    <div className="right-side-blog ps-lg-5">
      {/* Top Section */}
      <div className="right-side-blog-top">
        <div className="detailsSide">
          {/* Search Section */}
          <div className="rightsec-search">
            <input
              className="sinput"
              type="text"
              placeholder={t("rightBlog.searchPlaceholder")}
            />
            <button className="rightsec-btn" type="submit">
              <GoSearch />
            </button>
          </div>

          {/* Categories Section */}
          <div className="sercat">
            <h3 className="right-side-blog-title">
              {t("rightBlog.categoriesTitle")}
            </h3>
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
        <h3 className="right-side-blog-title">{t("rightBlog.recentPostTitle")}</h3>
        <div className="right-side-blog-posts-list">
          {posts.map((post, index) => (
            <div
              key={index}
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
        <h3 className="right-side-blog-title">
          {t("rightBlog.popularTagsTitle")}
        </h3>
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
