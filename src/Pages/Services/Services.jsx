import "../Services/Services.css";
import { useEffect, useState } from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import { useTranslation } from "react-i18next";

import { FaChalkboardTeacher } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdBook } from "react-icons/io";
import { PiVideoBold } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";

// mapping icons names to components
const iconsMap = {
  FaChalkboardTeacher: FaChalkboardTeacher,
  LiaChalkboardTeacherSolid: LiaChalkboardTeacherSolid,
  IoMdBook: IoMdBook,
  PiVideoBold: PiVideoBold,
  FaPersonChalkboard: FaPersonChalkboard,
};

function Services() {
  const { i18n } = useTranslation();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async (lang) => {
    try {
      setLoading(true);
      setError(null);

      // optional localStorage caching
      const cached = localStorage.getItem(`services_${lang}`);
      if (cached) {
        setServices(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:1911/getAllServices?lang=${lang}`
      );

      if (!res.ok) throw new Error("Failed to fetch services");

      const data = await res.json();

      localStorage.setItem(`services_${lang}`, JSON.stringify(data));
      
      setServices(data);

    } catch (err) {

      setError(err.message);
      setServices([]);

    } finally {
      setLoading(false);
    }
  };

  // fetch data when language changes
  useEffect(() => {
    fetchServices(i18n.language);
  }, [i18n.language]);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="row">
          {services.map((service) => {
            const IconComponent = iconsMap[service.icon]; 
            return (
              <div className="col-lg-4 col-md-6 mb-5" key={service._id}>
                <ServiceCard
                  icon={
                    IconComponent ? (
                      <IconComponent
                        fontSize="40px"
                        color="white"
                        className="icon-roka"
                      />
                    ) : null
                  }
                  title={service.title} 
                  description={service.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
