import { FaCircleCheck } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "../ServiceDetails/ServiceDetails.css";

function ServiceDetails() {
  return (
    <>
      <div className="serviceDetails-container  ">
        <div className="container p-0 ">
          <div className="row ">
            {/* left section */}
            <div className="left col-xl-8 col-lg-8 ">
              <div className="sec1">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 sec1div">
                    <div className="image">
                      <img src="../public/images/girll.jpg" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 webdesign">
                    <div className="text">
                      <h4 className="title">WEB DESIGN</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat aute irure dolor in reprehenderit.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua exercitation ullamco laboris.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec2 row ">
                <div className="col-xl-12 servicedesc">
                  <div className="text2">
                    <h4 className="title">SERVICE DESCRIPTION</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                  </div>
                </div>
              </div>
              <div className=" sec3 d-flex flex-column flex-lg-row mb-4  gap-lg-3">
                <div className="col-xl-6 col-lg-6  flex-fill  ">
                  <div className="inbox">
                    <h5 className="title-sm">
                      <span>
                        <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                      </span>
                      Requirements
                    </h5>

                    <p>
                      Dui id ornare arcu odio ut sem nulla pharetra diam eget
                      aliquet nibh praesent tristique magna sit amet purus.
                      Aenean euismod elementum nisi quis eleifend quam
                      adipiscing vitae proin.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 flex-fill">
                  <div className="inbox">
                    <h5 className="title-sm">
                      <span>
                        <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                      </span>
                      Description
                    </h5>

                    <p>
                      Dui id ornare arcu odio ut sem nulla pharetra diam eget
                      aliquet nibh praesent tristique magna sit amet purus.
                      Aenean euismod elementum nisi quis eleifend quam
                      adipiscing vitae proin.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sec4 row">
                <div className="col-xl-12 whatlearn">
                  <div className="learnwhat">
                    <h4 className="title">WHAT YOU'LL LEARN</h4>
                    <p className="mb-30">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                    <div className="imgvid ">
                      <img
                        src="../public/images/vidimage.jpg"
                        className="img-fluid "
                      />
                      <a className="pulse " href="">
                        <i className="fa-sharp fa-solid fa-play"></i>
                      </a>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      aute irure dolor in reprehenderit.
                    </p>
                    <p>
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
            <div className="right col-xl-4 col-lg-4 ">
              <div className="detailsSide ">
                <div className="search">
                  <input className="sinput" type="text" placeholder="search" />
                  <button className="btn" type="submit">
                    <GoSearch />
                  </button>
                </div>

                <div className="sercat ">
                  <h4 className="sidetitle">service category</h4>
                  <div className="sidecat">
                    Graphic Design
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                  <div className="sidecat">
                    Web Design
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                  <div className="sidecat">
                    It And Software
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                  <div className="sidecat">
                    Sales Marketing{" "}
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                  <div className="sidecat">
                    Art & Humanities{" "}
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                  <div className="sidecat">
                    Mobile Application
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
