import "./Price.css";
import { BsCheckCircle } from "react-icons/bs";
import Button from "../../../Components/Button/Button";

function Price() {
  const plans = [
    {
      title: "BASIC PLAN",
      headerClass: "bg-first-header-plan",
      bodyClass: "bg-first-plan",
      btnClass: "bg-primary-Educate",
      textColor: "text-dark",
    },
    {
      title: "STANDARD PLAN",
      headerClass: "bg-second-header-plan",
      bodyClass: "bg-second-plan",
      btnClass: "bg-warning",
      textColor: "text-light",
    },
    {
      title: "PREMIUM PLAN",
      headerClass: "bg-first-header-plan",
      bodyClass: "bg-first-plan",
      btnClass: "bg-primary-Educate",
      textColor: "text-secondary",
    },
  ];

  const features = [
    "7-Days Shipping World Wide",
    "3 Kg Weight Max / Package",
    "Free Wood Crate",
    "Get in touch to discuss",
    "Use Personal And Commercial",
    "24/7 Support",
  ];

  return (
    <div className="container py-5">
      <div className="row text-center">
        {plans.map((plan, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card box-shadow h-100">
              {/* ====== Header ====== */}
              <div
                className={`card-header ${plan.headerClass} text-white fit-content`}
              >
                <h4 className="my-0 fw-normal">{plan.title}</h4>
              </div>

              {/* ====== Body ====== */}
              <div
                className={`card-body ${plan.bodyClass} position-relative overflow-hidden`}
              >
                {/* ====== Circles ====== */}
                <div className="position-absolute small-circle-inside-plan d-flex justify-content-center align-items-center">
                  <p className="fw-bold mb-0 fs-4 text-dark">
                    20 <span className="fs-7 fw-normal text-dark">Month</span>
                  </p>
                </div>

                <div className="position-absolute big-circle-inside-plan"></div>

                {/* ====== Content ====== */}
                <div
                  className={`position-absolute top-60 ps-4 start-50 translate-middle text-center w-100 px-3 ${plan.textColor}`}
                >
                  <p className="fs-65 fw-bold w-75 m-auto">
                    Advanced features for pros who need more customization.
                  </p>

                  <ul className="list-unstyled mt-4 mb-4 text-start">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start"
                      >
                        <BsCheckCircle className="text-success me-3" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* ====== Button ====== */}
                  <Button
                    children="Get Started"
                    className={`w-100  mt-5  ${plan.btnClass}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Price;
