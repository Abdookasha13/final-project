import TestimonialCard from "../../../Components/Testimonial/TestimonialCard"

function Testimonial() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        <TestimonialCard />
        <TestimonialCard
          image="https://ordainit.com/html/educate/assets/img/avatar/avatar-2.png"
          name="George McGruder"
          grade="Student"
          content="This course has changed my life for the better!"
        />
        <TestimonialCard 
         image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEL6N_ZrQEczSBXHtT9zQPTXO2CVx3N2IB2A&s"
          name="Karlo Ivanovic"
          grade="Student"
          content="This course is Best choice for beginners!"
        />
        <TestimonialCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm32rlGBTKroDJOs1BECCJ0O6ybWfUBVqYA&s"
          name="Jolian Adams"
          grade="Student"
          content="Highly recommend this course to everyone!"
        />
        <TestimonialCard 
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsrwAr-Zg2Td38ykuaLH7gbfmqEwor-8M40w&s"
          name="Better Johnson"
          grade="Student"
          content="An excellent resource for learning new skills."
        />
        <TestimonialCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTngKU5dESAthh06vkC8vNoWZx2pvX2ysP6-A&s"
          name="Jasmine Lee"
          grade="Student"
          content="A must-have course for anyone looking to improve their skills."
        />
      </div>
    </div>
  )
}

export default Testimonial