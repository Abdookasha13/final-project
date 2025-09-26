import Socialicons from "../Socialicons/Socialicons";

import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            {/* ===== Left Footer ===== */}
            <div className="col-sm-6 col-lg-4 col-xl-4 mb-5 left-footer">
              <div className="footer-logo pb-4">
                <img src="/Images/footer-logo.png" alt="" />
              </div>
              <p className="pb-3">
                Interdum velit laoreet id donec ultrices tincidunt arcu.
                Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu.
              </p>

              <div className="d-flex gap-2">
                <Socialicons wrapperClass="footer-social" />
              </div>
            </div>

            {/* ===== Center Footer ===== */}

            <div className="left-center-footer col-sm-6 col-lg-4 col-xl-3">
              <h4 className="footer-title">Our Services:</h4>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>Web development</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>UI/UX Design</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>Management</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>Digital Marketing</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>Blog News</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right-center-footer col-sm-6 col-lg-4 col-xl-2">
              <h4 className="footer-title">Quick Links:</h4>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>templates</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>blog and article</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>integrations</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>webinars</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>privacy &amp;policy</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* ===== Right Footer ===== */}
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5 right-footer">
              <h4 className="footer-title">Gallery</h4>
              <div className="row g-2">
                <div className="col-4">
                  <img src="Images/footer-1.png" alt="" />
                </div>
                <div className="col-4">
                  <img src="Images/footer-2.png" alt="" />
                </div>
                <div className="col-4">
                  <img src="Images/footer-3.png" alt="" />
                </div>
                <div className="col-4">
                  <img src="Images/footer4.png" alt="" />
                </div>
                <div className="col-4">
                  <img src="Images/footer-5.png" alt="" />
                </div>
                <div className="col-4">
                  <img src="Images/footer-6.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-12 itfadeUp">
              <div className="copyright-text text-center">
                <p>
                  Copyright © 2023 <a href="#">Educate </a> || All Rights
                  Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
