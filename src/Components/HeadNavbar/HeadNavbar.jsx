import "./HeadNavbar.css";

function HeadNavbar() {
  return (
    <>
      <div className="head-navbar">
        <div className="container">
          <div className="row">
            {/* ================left head navbar================== */}
            <div className="col-xl-8 col-lg-6 col-md-5 col-sm-7 ">
              <div className="left-head-navbar">
                <ul className="text-center text-sm-start">
                  <li className="d-none d-xl-inline-block">
                    <a href="tel:(00)8757845682">
                      <span>
                        <i class="fa-solid fa-phone-volume"></i>
                      </span>
                      (00) 875 784 5682
                    </a>
                  </li>
                  <li className="d-none d-xl-inline-block">
                    <a href="mailto:pacargoinfo@gmail.com">
                      <span>
                        <i class="fa-solid fa-envelope-open-text"></i>
                      </span>
                      pacargoinfo@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <i class="fa-solid fa-map-marker-alt"></i>
                      </span>
                      Hudson, Wisconsin(WI), 54016
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* ================right head navbar================== */}
            <div className="col-xl-4 col-lg-6 col-md-7 col-sm-5 d-none d-sm-block">
              <div className="text-end">
                <div className="right-head-navbar">
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
                          <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-skype"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
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
