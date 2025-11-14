import PropTypes from "prop-types";
import Button from "../../../Components/Button/Button";
import { Check, ArrowRight, CircleCheckBig } from "lucide-react";
import "./Price.css";

export const Price = () => {
  const priceBlansInfo = [
    {
      mainTitle: "Basic Plan",
      time: "20",
      insideTitle: "Advanced features for pros who need more customization.",
      features: [
        "7-Days Shipping World Wide",
        "3 Kg Weight Max /Package",
        "Free Wood Crate",
        "Get in touch to discuss",
        "Use Personal And Commercial",
        "24/7 Support",
      ],
    },
    {
      mainTitle: "Standard Plan",
      time: "40",
      insideTitle: "Advanced features for pros who need more customization.",
      features: [
        "7-Days Shipping World Wide",
        "3 Kg Weight Max /Package",
        "Free Wood Crate",
        "Get in touch to discuss",
        "Use Personal And Commercial",
        "24/7 Support",
      ],
    },
    {
      mainTitle: "Premium Plan",
      time: "60",
      insideTitle: "Advanced features for pros who need more customization.",
      features: [
        "7-Days Shipping World Wide",
        "3 Kg Weight Max /Package",
        "Free Wood Crate",
        "Get in touch to discuss",
        "Use Personal And Commercial",
        "24/7 Support",
      ],
    },
  ];
  return (
    <div className="container pt-4 pb-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-5 mb-5  text-center">
        {priceBlansInfo.map((Plan, index) => {
          return (
            <div className="col">
              <div
                className={`card overflow-hidden card-${Plan.mainTitle
                  .split(" ")[0]
                  .toLowerCase()}  mb-4 rounded-3 shadow-sm`}
              >
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{Plan.mainTitle}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ${Plan.time}
                    <small className="text-body-secondary fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled   mb-4 ">
                    <ul className="lh-lg">
                      <h5 className="text-center mb-4 fs-5 fw-bold">
                        {Plan.insideTitle}
                      </h5>
                      {Plan.features.map((feature, index) => {
                        return (
                          <li key={index} className="responsive-font">
                            <CircleCheckBig
                              size={40}
                              className="pe-4"
                              color="#1bbda3"
                            />
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                  </ul>
                  <Button
                    type="button"
                    className="button-custimitation m-auto z-1"
                  >
                    Sign up for free
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Price;
