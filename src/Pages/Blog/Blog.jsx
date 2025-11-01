import BlogCard from "../../Components/BlogCard/BlogCard"

function Blog() {
  return (
     <>
      <div className="container py-5">
        <div className="row">
          <BlogCard />
          <BlogCard
            imgSrc="https://ordainit.com/html/educate/assets/img/blog/blog-1-2.jpg"
          />
          <BlogCard
            imgSrc="https://ordainit.com/html/educate/assets/img/blog/blog-1-3.jpg" 
          />
            <BlogCard />
          <BlogCard
            imgSrc="https://ordainit.com/html/educate/assets/img/blog/blog-1-2.jpg"
          />
          <BlogCard
            imgSrc="https://ordainit.com/html/educate/assets/img/blog/blog-1-3.jpg" 
          />

        </div>
      </div>
    </>
  )
}

export default Blog