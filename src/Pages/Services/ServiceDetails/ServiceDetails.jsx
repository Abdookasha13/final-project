import { FaCircleCheck } from "react-icons/fa6";
import "../ServiceDetails/ServiceDetails.css";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getServiceById from "../../../utilities/getServiceById";

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    getServiceById(id, setService);
  }, [id]);

  return (
    <>
      <div className="serviceDetails-container  ">
        <div className="container p-0 ">
          <div className="row">
            {/* left section */}
            <div className="serviceDetails-left col-xl-8 col-lg-8 ">
              <div className="serviceDetails-sec1">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 ">
                    <div className="serviceDetails-image">
                      <img src="https://ordainit.com/html/educate/assets/img/service/sv-1.jpg" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 webdesign">
                    <div className="serviceDetails-text">
                      <h4 className="serviceDetails-title">{service?.title}</h4>
                      <p className="serviceDetails-paragraphs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat aute irure dolor in reprehenderit.
                      </p>
                      <p className="serviceDetails-paragraphs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua exercitation ullamco laboris.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="serviceDetails-sec2 row ">
                <div className="col-xl-12 servicedesc">
                  <div className="serviceDetails-text2">
                    <h4 className="serviceDetails-title">
                      SERVICE DESCRIPTION
                    </h4>
                    <p className="serviceDetails-paragraphs">
                      {service?.description}
                    </p>
                    <p className="serviceDetails-paragraphs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                  </div>
                </div>
              </div>
              <div className=" serviceDetails-sec3 d-flex flex-column flex-lg-row mb-4  gap-lg-3">
                <div className="col-xl-6 col-lg-6  flex-fill  ">
                  <div className="serviceDetails-inbox">
                    <h5 className="serviceDetails-title-sm">
                      <span>
                        <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                      </span>
                      Requirements
                    </h5>

                    <p className="serviceDetails-paragraphs">
                      Dui id ornare arcu odio ut sem nulla pharetra diam eget
                      aliquet nibh praesent tristique magna sit amet purus.
                      Aenean euismod elementum nisi quis eleifend quam
                      adipiscing vitae proin.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 flex-fill">
                  <div className="serviceDetails-inbox">
                    <h5 className="serviceDetails-title-sm">
                      <span>
                        <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                      </span>
                      Description
                    </h5>

                    <p className="serviceDetails-paragraphs">
                      Dui id ornare arcu odio ut sem nulla pharetra diam eget
                      aliquet nibh praesent tristique magna sit amet purus.
                      Aenean euismod elementum nisi quis eleifend quam
                      adipiscing vitae proin.
                    </p>
                  </div>
                </div>
              </div>
              <div className="serviceDetails-sec4 row">
                <div className="col-xl-12 whatlearn">
                  <div className="learnwhat">
                    <h4 className="serviceDetails-title">WHAT YOU'LL LEARN</h4>
                    <p className="mb-30 serviceDetails-paragraphs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                    <div className="serviceDetails-imgvid ">
                      <img
                        src="https://ordainit.com/html/educate/assets/img/service/sv-2.jpg"
                        className="img-fluid "
                      />
                      <a className="pulse " href="">
                        <i className="fa-sharp fa-solid fa-play"></i>
                      </a>
                    </div>
                    <p className="serviceDetails-paragraphs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                    <p className="serviceDetails-paragraphs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
              <RightSideBlog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
