import Button from "../../../Components/Button/Button";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import BlogPost from "../../../Components/blogBost/blogBost";
import "./BlogSidebar.css";


function BlogSidebar() {

  return (
    <>
      <div className="row py-5 mt-5">
        <div className="left-side-blog-details col-lg-8">
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-2.jpg"} />
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-3.jpg"} galry={true} />
          <BlogPost imgUrl={"https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-2.jpg"} />
        </div>
        <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
          <RightSideBlog />
        </div>
      </div>
    </>
  )
}

export default BlogSidebar