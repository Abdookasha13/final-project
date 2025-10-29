import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import "../Services/Services.css";
import teacher from "../../assets/images/teacher.png";
import write from "../../assets/images/write.png";

import coding from "../../assets/images/coding.png";

const services = [
  {
    icon: teacher,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills.",
  },
  {
    icon: write,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions.",
  },
  {
    icon: coding,
    title: "Creative Minds",
    description: "Inspire your creativity with modern learning tools.",
  },
  {
    icon: coding,
    title: "Best Coaching",
    description: "Learn from expert mentors and improve your skills.",
  },
  {
    icon: write,
    title: "Convenient Practice",
    description: "Practice anytime with flexible online sessions.",
  },
  {
    icon: teacher,
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
            <img src={service.icon} alt={service.title} />
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
