import Button from "../../../Components/Button/Button";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import "./BlogDetails.css";
import { useTranslation } from "react-i18next";

function BlogDetails() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  return (
    <>
      <div className="row py-5 mt-5">
        <div className="left-side-blog-details col-lg-8">

          <div>
            <img
              src="https://ordainit.com/html/educate/assets/img/blog/blog-details-1.jpg"
              className="rounded-2 w-100"
              alt="blog"
            />

            <div className="mt-4 d-flex align-items-center gap-5 history-comments">
              <span className="d-flex align-items-center gap-2 fw-bold">
                <i className="fa-solid fa-calendar-days"></i>
                {t("blogDetails.date")}
              </span>

              <span className="d-flex align-items-center gap-2 fw-bold">
                <i className="fa-regular fa-comments"></i>
                {t("blogDetails.comments")}
              </span>
            </div>
          </div>

          <div className="left-side-blog-details-box1">
            <h4 className="my-4">
              {t("blogDetails.title")}
            </h4>

            <p>{t("blogDetails.paragraph1")}</p>
            <p>{t("blogDetails.paragraph2")}</p>
            <p>{t("blogDetails.paragraph3")}</p>
          </div>

          <div className="left-side-blog-details-box2 my-4 row">
            <div className="col-12 col-md-6">
              <img
                src="https://ordainit.com/html/educate/assets/img/blog/blog-details-2.jpg"
                className="w-100"
                alt=""
              />
            </div>
            <div className="col-12 col-md-6">
              <img
                src="https://ordainit.com/html/educate/assets/img/blog/blog-details-3.jpg"
                className="w-100"
                alt=""
              />
            </div>
          </div>

          <div className="left-side-blog-details-box3">
            <h4>{t("blogDetails.latestTitle")}</h4>
            <p>{t("blogDetails.latestText")}</p>
          </div>

          <div className="left-side-blog-details-box4 text-center">
            <i className="fas fa-quote-right"></i>
            <p>{t("blogDetails.quote")}</p>
            <span>{t("blogDetails.quoteAuthor")}</span>
          </div>

          <div className="left-side-blog-details-box5 mt-5 pt-4">
            <div className="row align-items-center">
              <div className="col-xl-7 col-lg-7 col-md-7 mb-4">
                <div>
                  <span>{t("blogDetails.postedIn")}</span>
                  <a href="#">Development</a>
                  <a href="#">Digital</a>
                  <a href="#">Tech</a>
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-5 mb-4">
                <div className="text-lg-end">
                  <span>{t("blogDetails.share")}</span>
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="left-side-blog-details-box6 p-4">
            <div className="d-md-flex align-items-center">
              <div className="mb-4 mb-md-0">
                <img src="https://ordainit.com/html/educate/assets/img/avatar/avata-3.png" />
              </div>

              <div className="ps-4">
                <div className="d-flex align-items-center justify-content-between">
                  <span>{t("blogDetails.commentDate")}</span>
                  <a href="#">{t("blogDetails.reply")}</a>
                </div>

                <div>
                  <h5 className="py-4">{t("blogDetails.commentAuthor")}</h5>
                </div>

                <p>{t("blogDetails.commentText")}</p>
              </div>
            </div>
          </div>

          <div className="left-side-blog-details-box7 mt-5">
            <div style={{ paddingBottom: "30px" }}>
              <h5>{t("blogDetails.contactTitle")}</h5>
              <p>{t("blogDetails.contactDesc")}</p>
            </div>

            <form>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-12 mb-4">
                  <input type="text" placeholder={t("blogDetails.form.name")} />
                </div>

                <div className="col-xl-6 col-lg-6 col-12 mb-4">
                  <input type="email" placeholder={t("blogDetails.form.email")} />
                </div>

                <div className="col-12 mb-4">
                  <input type="text" placeholder={t("blogDetails.form.website")} />
                </div>

                <div className="col-12 mb-4">
                  <textarea placeholder={t("blogDetails.form.message")}></textarea>
                </div>
              </div>
            </form>

            <Button>{t("blogDetails.sendMessage")}</Button>
          </div>
        </div>

        <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
          <RightSideBlog language={lang} />
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
