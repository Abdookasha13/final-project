import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import "../Services/Services.css";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdBook } from "react-icons/io";
import { PiVideoBold } from "react-icons/pi";

import { FaChalkboardTeacher } from "react-icons/fa";

import { FaPersonChalkboard } from "react-icons/fa6";

const services = [
  {
    icon: <FaChalkboardTeacher fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills.",
  },
  {
    icon: <LiaChalkboardTeacherSolid fontSize={"40px"} color="white" className="icon-roka"/>,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions.",
  },
  {
    icon: <IoMdBook fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Creative Minds",
    description: "Inspire your creativity with modern learning tools.",
  },

  {
    icon: <FaPersonChalkboard fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions.",
  },
  {
    icon: <PiVideoBold fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills.",
  },
  {
    icon: <FaChalkboardTeacher fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills.",
  },
];
function Services() {
  return (
    <section className="services">
      {services.map((service, index) => (
        <div className="service-card" key={index}>
          <div className="icon-wrapper">
            {service.icon}
          </div>
          <h3>{service.title}</h3>
          <div>
          <p>{service.description}</p>
            <button>
            View Details 
            <svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1.24023L16 7.24023L11 13.2402"
                stroke="currentcolor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M1 7.24023H16"
                stroke="currentcolor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
            </div>
          
          
        </div>
      ))}
    </section>
  );
}

export default Services;
