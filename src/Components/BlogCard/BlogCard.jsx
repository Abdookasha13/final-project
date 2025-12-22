import Button from "../Button/Button";
import "./BlogCard.css";
import { useTranslation } from "react-i18next";

const BlogCard = ({ imgSrc, date, comments, title }) => {
  const { t } = useTranslation();

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
      <div className="it-blog-item">
        <div className="it-blog-thumb">
          <a href="#">
            <img
              src={
                imgSrc ||
                "https://ordainit.com/html/educate/assets/img/blog/blog-1-1.jpg"
              }
              alt={t("blogcard.alt")}
            />
          </a>
        </div>

        <div className="it-blog-content">
          <div className="it-blog-meta">
            <span>
              <i className="fa-solid fa-calendar-days"></i>
              {date || t("blogcard.defaultDate")}
            </span>

            <span>
              <i className="fa-solid fa-message"></i>
              {comments || t("blogcard.defaultComments")}
            </span>
          </div>

          <h4 className="it-blog-title">
            <a href="#">
              {title || t("blogcard.defaultTitle")}
            </a>
          </h4>

          <Button>{t("blogcard.readMore")}</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
