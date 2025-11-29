

import "bootstrap/dist/css/bootstrap.min.css";
import "../Contact/Contact.css";
import "../../Components/Socialicons/Socialicons.css";

import Contactbox from "../../Components/Contactbox/Contactbox";
import { FaArrowDown, FaLocationDot } from "react-icons/fa6";
import { TbClockHour5Filled } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";

import Form from "../../Components/Form/Form";
import Socialicons from "../../Components/Socialicons/Socialicons";

const Contact = () => {
  return (
    <>
      <div className="container contactbox-container ">
        <div className="contact-wrapper">
          {/* ///شايل 2 div //1-triangle div */}
          <div>
            <img className="triangle" src="Images/shape-2-1.png" />
          </div>

          {/* //2-row div---contains 2 divs left/right */}
          <div className=" row contact-row  ">
            {/* 1-leftone */}
            <div className="col-xl-7  rightsec">
              <div className="texts">
                <h4 className="contact-title">Get in Touch</h4>
                <div className="contact-desc">
                  <p>
                    Suspendisse ultrice gravida dictum fusce placerat ultricies
                    integer
                  </p>
                </div>
              </div>
              <div className="contact-box">
                <ul className="contact-list">
                  <li>
                    <Contactbox Icon={FaLocationDot} label="Our Address">
                      <a href="#">1564 Goosetown Drive Matthews, NC 28105</a>
                    </Contactbox>
                  </li>

                  <li className="contact-spaced">
                    <Contactbox
                      Icon={TbClockHour5Filled}
                      label="Hours of Operation"
                    >
                      <a href="#">Mon - Fri: 9.00am to 5.00pm</a>
                      <span className="contact-label">[2nd sat Holiday]</span>
                    </Contactbox>
                  </li>

                  <li>
                    <Contactbox Icon={BsFillTelephoneFill} label="Contact">
                      <a href="#">+99-35895-4565</a>
                      <a href="#">supportyou@info.com</a>
                    </Contactbox>
                  </li>
                </ul>
              </div>

              <div className="d-flex flex-column gap-4 flex-md-row justify-content-between align-items-md-center  mt-5 flex-xl-row  customer-care ">
                <div className="linktitle">
                  <a href="#" className="customer-link">
                    <FaArrowDown className="arrow-icon" />
                    Customer Care
                  </a>
                </div>
                <div className=" d-flex gap-2">
                  <Socialicons />
                </div>
              </div>
            </div>
            {/* 2-right one */}
            <div className="col-xl-5  ">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
