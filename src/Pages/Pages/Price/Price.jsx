import PropTypes from "prop-types";
import Button from "../../../Components/Button/Button";
import { Check, ArrowRight, CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Price.css";

export const Price = () => {
  const { t } = useTranslation();
  const priceBlansInfo = [
    {
      mainTitle: "Basic Plan",
      time: "20",
      insideTitle: t("price.featureHead"),
      features: [
        t("price.feature1"),
        t("price.feature2"),
        t("price.feature3"),
        t("price.feature4"),
        t("price.feature5"),
        t("price.feature6"),
      ],
    },
    {
      mainTitle: "Standard Plan",
      time: "40",
      insideTitle: t("price.featureHead"),
      features: [
         t("price.feature1"),
        t("price.feature2"),
        t("price.feature3"),
        t("price.feature4"),
        t("price.feature5"),
        t("price.feature6"),
      ],
    },
    {
      mainTitle: "Premium Plan",
      time: "60",
      insideTitle: t("price.featureHead"),
      features: [
         t("price.feature1"),
        t("price.feature2"),
        t("price.feature3"),
        t("price.feature4"),
        t("price.feature5"),
        t("price.feature6"),
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
                  <h4 className="my-0 fw-normal">{t(`price.${Plan.mainTitle}`)}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ${Plan.time}
                    <small className="text-body-secondary fw-light">/{t("price.perMonth")}</small>
                  </h1>
                  <ul className="list-unstyled   mb-4 ">
                    <ul className="lh-lg">
                      <h5 className="text-center mb-4 fs-5 fw-bold">
                        {Plan.insideTitle}
                      </h5>
                      {Plan.features.map((feature, index) => {
                        return (
                          <li key={index} className="responsive-font">
                            
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
                    {t("price.button")}
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
