import Button from "../../../Components/Button/Button";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import "./BlogDetails.css";
  import { useTranslation } from "react-i18next";

function BlogDetails() {
  const { i18n } = useTranslation();
  return (
    <>
      <div className="row py-5 mt-5">
        <div className="left-side-blog-details col-lg-8">
          <div>
            <img
              src="https://ordainit.com/html/educate/assets/img/blog/blog-details-1.jpg"
              className="rounded-2 w-100"
            />
            <div className="mt-4 d-flex align-items-center gap-5 history-comments">
              <span className="d-flex align-items-center gap-2 fw-bold">
                <i className="fa-solid fa-calendar-days"></i>{i18n.language === "en" ? "June 14, 2023" : "14 يونيو 2023"}
              </span>
              <span className="d-flex align-items-center gap-2 fw-bold">
                <i className="fa-regular fa-comments"></i>{ i18n.language === "en" ? "2 Comments" : "2 تعليقات"} 
              </span>
            </div>
          </div>

          <div className="left-side-blog-details-box1">
            <h4 className="my-4 ">
            {i18n.language === "en" ? "Understanding Performance Marketing: A Comprehensive Guide" : "فهم التسويق بالأداء: دليل شامل"}
            </h4>
            <p>
              {i18n.language === "en" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco labori nisi ut aliquip ex ea commodo consequat aute irure dolor in reprehenderit." : " لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسشينغ إيليت، سيد دو إيوسمد تيمبور إنسيديدونت أوت لابوري إت دولوري ماغنا أليكا. أوتنيم أد مينيم فينيام، كويز نوسترود إكسرشيتايشن أولامكو لابوري نيسي أوت أليكويب إكس إيا كومودو كونسيكوات أوتي إيرور دولور إن ريبريندينت."}
            </p>
            <p>
                           {i18n.language === "en" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco labori nisi ut aliquip ex ea commodo consequat aute irure dolor in reprehenderit." : " لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسشينغ إيليت، سيد دو إيوسمد تيمبور إنسيديدونت أوت لابوري إت دولوري ماغنا أليكا. أوتنيم أد مينيم فينيام، كويز نوسترود إكسرشيتايشن أولامكو لابوري نيسي أوت أليكويب إكس إيا كومودو كونسيكوات أوتي إيرور دولور إن ريبريندينت."}

            </p>
            <p>
                            {i18n.language === "en" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco labori nisi ut aliquip ex ea commodo consequat aute irure dolor in reprehenderit." : " لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسشينغ إيليت، سيد دو إيوسمد تيمبور إنسيديدونت أوت لابوري إت دولوري ماغنا أليكا. أوتنيم أد مينيم فينيام، كويز نوسترود إكسرشيتايشن أولامكو لابوري نيسي أوت أليكويب إكس إيا كومودو كونسيكوات أوتي إيرور دولور إن ريبريندينت."}

            </p>
          </div>

          <div className="left-side-blog-details-box2 my-4 row">
            <div className="col-12 col-md-6">
              <img
                src="https://ordainit.com/html/educate/assets/img/blog/blog-details-2.jpg"
                className="w-100"
              />
            </div>
            <div className="col-12 col-md-6">
              <img
                src="https://ordainit.com/html/educate/assets/img/blog/blog-details-3.jpg"
                className="w-100"
              />
            </div>
          </div>

          <div className="left-side-blog-details-box3">
            <h4>{i18n.language === "en" ? "Latest Articles Updated Daily" : "أحدث المقالات محدثة يومياً"}</h4>
            <p>
                            {i18n.language === "en" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco labori nisi ut aliquip ex ea commodo consequat aute irure dolor in reprehenderit." : " لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسشينغ إيليت، سيد دو إيوسمد تيمبور إنسيديدونت أوت لابوري إت دولوري ماغنا أليكا. أوتنيم أد مينيم فينيام، كويز نوسترود إكسرشيتايشن أولامكو لابوري نيسي أوت أليكويب إكس إيا كومودو كونسيكوات أوتي إيرور دولور إن ريبريندينت."}

            </p>
          </div>

          <div className="left-side-blog-details-box4 text-center">
            <i className="fas fa-quote-right"></i>
            <p>
            {i18n.language === "en" ? "The best way to predict the future is to create it." : "أفضل طريقة للتنبؤ بالمستقبل هي خلقه."}
            </p>
            <span>David Backhum</span>
          </div>

          <div className="left-side-blog-details-box5 mt-5 pt-4">
            <div className="row align-items-center">
              <div className="col-xl-7 col-lg-7 col-md-7 mb-4">
                <div>
                  <span>Posted in:</span>
                  <a href="#">Development</a>
                  <a href="#">Digital</a>
                  <a href="#">Tech</a>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-5 mb-4">
                <div className="text-lg-end">
                  <span>Share:</span>
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="left-side-blog-details-box6 p-4 ">
            <div className=" d-md-flex align-items-center">
              <div className="mb-4 mb-md-0">
                <img src="https://ordainit.com/html/educate/assets/img/avatar/avata-3.png" />
              </div>
              <div className="ps-4 ">
                <div className=" d-flex align-items-center justify-content-between">
                  <span>September 6, 2022 at 1:28 pm </span>
                  <a href="#">Reply</a>
                </div>
                <div>
                  <h5 className="py-4">Jonathon Lopez</h5>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipi vestibulum lectus
                  egestas cubilia nam sagittis, nulla posuere habitant
                </p>
              </div>
            </div>
          </div>

          <div className="left-side-blog-details-box7  mt-5">
            <div style={{ paddingBottom: "30px" }}>
              <h5>Let’s Get in Touch</h5>
              <p>
                Your email address will not be published. Required fields are
                marked *
              </p>
            </div>
            <form action="#">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-12 mb-4">
                  <input type="text" placeholder="Your Name*" />
                </div>
                <div class="col-xl-6 col-lg-6 col-12 mb-4">
                  <input type="email" placeholder="Email Address*" />
                </div>
                <div class="col-12 mb-4">
                  <input type="email" placeholder="Website*" />
                </div>
                <div class="col-12 mb-4">
                  <textarea placeholder="Write Your Message*"></textarea>
                </div>
              </div>
            </form>
            <Button>Send Message</Button>
          </div>
        </div>
        <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
          <RightSideBlog props={i18n.language} />
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
