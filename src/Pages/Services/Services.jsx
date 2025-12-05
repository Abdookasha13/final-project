import "../Services/Services.css";
import ServiceCard from "./../../Components/ServiceCard/ServiceCard";
import { useEffect, useState } from "react";
import getAllServices from "../../utilities/getAllServices";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServices(setServices);
  }, []);

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {services.map((service, index) => (
            <div className="col" key={service._id || index}>
              <ServiceCard
                service={service}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
