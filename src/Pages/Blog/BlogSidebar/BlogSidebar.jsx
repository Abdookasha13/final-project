import BlogPost from "../../../Components/BlogPost/BlogPost";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import "./BlogSidebar.css";
import { useTranslation } from "react-i18next";
function BlogSidebar() {

const { i18n } = useTranslation();
  return (
     <>
      <div className="row py-5 mt-5">
        <div className="left-side-blog-details col-lg-8">
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-2.jpg"} />
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-3.jpg"} galry={true} />
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-2.jpg"} />
        </div>
        <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
          <RightSideBlog  props={i18n.language} />
        </div>
      </div>
    </>
  )
}

export default BlogSidebar