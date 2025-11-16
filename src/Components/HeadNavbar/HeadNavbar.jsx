import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import "./HeadNavbar.css";

function HeadNavbar() {
  return (
    <>
      <div className="head-navbar">
        <div className="container">
          <div className="row align-items-center">
            {/* ================left head navbar================== */}
            <div className="col-6 col-md-5 col-lg-5 col-xl-8">
              <div className="left-head-navbar">
                <ul className="text-center text-sm-start">
                  <li className="d-none d-xl-inline-block">
                    <a href="tel:(00)8757845682">
                      <span>
                        <i className="fa-solid fa-phone-volume"></i>
                      </span>
                      (00) 875 784 5682
                    </a>
                  </li>
                  <li className="d-none d-xl-inline-block">
                    <a href="mailto:pacargoinfo@gmail.com">
                      <span>
                        <i className="fa-solid fa-envelope-open-text"></i>
                      </span>
                      pacargoinfo@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <i className="fa-solid fa-map-marker-alt"></i>
                      </span>
                      Hudson, Wisconsin(WI), 54016
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* ================right head navbar================== */}
            <div className="col-6 col-md-7 col-lg-7 col-xl-4">
              <div className="text-end d-flex align-items-center justify-content-end gap-3">
                      <ToggleLanguage />
                <div className="right-head-navbar d-none d-sm-block">
                  <ul>
                    <li>
                      <div className="d-none d-md-block">
                        <a href="#">Help / </a>
                        <a href="#">support</a>
                        <a href="#"> / contact</a>
                      </div>
                    </li>
                    <li>
                      <div className="head-social">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-skype"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadNavbar;
