import "../Services/Services.css";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdBook } from "react-icons/io";
import { PiVideoBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import ServiceCard from './../../Components/ServiceCard/ServiceCard';

const services = [
  {
    icon: <FaChalkboardTeacher fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: " Our coaching sessions focus on personalized guidance to help you achieve your goals.",
  },
  {
    icon: <LiaChalkboardTeacherSolid fontSize={"40px"} color="white" className="icon-roka"/>,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions  to help you achieve your goals.",
  },
  {
    icon: <IoMdBook fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Creative Minds",
    description: "Inspire your creativity with modern learning tools  to help you achieve your goals.",
  },

  {
    icon: <FaPersonChalkboard fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions  to help you achieve your goals.",
  },
  {
    icon: <PiVideoBold fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills  to help you achieve your goals.",
  },
  {
    icon: <FaChalkboardTeacher fontSize={"40px"} color="white" className="icon-roka" />,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills  to help you achieve your goals.",
  },
];
function Services() {
  return (
     <section className="services-section py-5">
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6 mb-5" key={index}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

