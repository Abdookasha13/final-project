import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./RightSideBlog.css";
import { GoSearch } from "react-icons/go";
import { t } from "i18next";

function RightSideBlog(language) {
  const posts =  [
    {
      id: 1,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-1.jpg",
      date: language.props == "en" ? "14 June 2023" : "14 يونيو 2023",
      title: language.props == "en" ? "Interdum velit laoreet id donec ultrices tincidunt arcu." : "إنتردوم فيليت لاوريت إيد دونيك ألتريسيس تينسيدونت أركو.",
    },
    {
      id: 2,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-2.jpg",
      date:  language.props == "en" ? "14 June 2023" : "14 يونيو 2023",
      title: language.props == "en" ? "Interdum velit laoreet id donec ultrices tincidunt arcu." : "إنتردوم فيليت لاوريت إيد دونيك ألتريسيس تينسيدونت أركو.",
    },
    {
      id: 3,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-3.jpg",
      date:  language.props == "en" ? "14 June 2023" : "14 يونيو 2023",
      title: language.props == "en" ? "Interdum velit laoreet id donec ultrices tincidunt arcu." : "إنتردوم فيليت لاوريت إيد دونيك ألتريسيس تينسيدونت أركو.",
    },
    {
      id: 4,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-4.jpg",
      date:  language.props == "en" ? "14 June 2023" : "14 يونيو 2023",
      title: language.props == "en" ? "Interdum velit laoreet id donec ultrices tincidunt arcu." : "إنتردوم فيليت لاوريت إيد دونيك ألتريسيس تينسيدونت أركو.",
    },
    {
      id: 5,
      img: "https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-sm-5.jpg",
      date: language.props == "en" ? "14 June 2023" : "14 يونيو 2023",
      title: language.props == "en" ? "Interdum velit laoreet id donec ultrices tincidunt arcu." : "إنتردوم فيليت لاوريت إيد دونيك ألتريسيس تينسيدونت أركو.",
    },
  ];

  const tags = language.props == "en" ? [
    "Balance",
    "Coaching",
    "Motivation",
    "Courses",
    "Life guide",
    "Strategy",
    "Education",
    "Coach",
  ] : [
    "توازن",
    "التدريب",
    "التحفيز",
    "الدورات",
    "دليل الحياة",
    "استراتيجية",
    "التعليم",
    "مدرب",
  ];

  const categories = language.props == "en" ? [
     "graphic Design",
    "Web Design",
    "It And Software",
    "Sales Marketing",
    "Art & Humanities",
    "Mobile Application",
  ] : ["مصمم جرافيك", "مصمم ويب", "تكنولوجيا المعلومات والبرمجيات", "مبيعات وتسويق", "الفنون والعلوم الإنسانية", "تطبيقات الجوال"]

   
  

console.log("hi how ar");

  return (
    <div className="right-side-blog ps-lg-5">
      {/* Top Section */}
      <div className="right-side-blog-top">
        <div className="detailsSide">
          {/* Search Section */}
          <div className="rightsec-search">
            <input className="sinput" type="text" placeholder={language.props == "en" ? "Search" : "بحث"} />
            <button className="rightsec-btn" type="submit">
              <GoSearch />
            </button>
          </div>

          {/* Categories Section */}
          <div className="sercat">
            <h3 className="right-side-blog-title">{language.props == "en" ? "service categories" : "فئات الخدمة"}</h3>
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
        <h3 className="right-side-blog-title">{language.props == "en" ? "Recent Post" : "آخر المنشورات"}</h3>
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
        <h3 className="right-side-blog-title">{language.props == "en" ? "Popular Tags" : "العلامات الشائعة"}:</h3>
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
