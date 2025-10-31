import Button from "../../../Components/Button/Button";
import TeachersProgress from "../../../Components/TeachersProgress/TeachersProgress";
import "./TeacherDetails.css";

function TeacherDetails() {
  return (
    <>
      <div className="teacher-details">
        <div className="row">
          {/* ------------left side---------------- */}
          <div className="col-lg-3">
            <div className="teacher-details-left">
              <div className="teacher-details-left-img">
                <img
                  src="https://ordainit.com/html/educate/assets/img/team/team-inner.jpg"
                  alt=""
                />
              </div>
              <div className="teacher-details-left-social text-center">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-skype"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="teacher-details-left-bio">
                <ul>
                  <li>
                    <i class="fa-solid fa-phone-volume"></i>
                    <a href="tel:(568)367987237">(568) 367-987-237</a>
                  </li>
                  <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <a href="https://www.google.com/maps" target="_blank">
                      Hudson, Wisconsin(WI), 54016
                    </a>
                  </li>
                  <li>
                    <i class="fa-solid fa-envelope"></i>
                    <a href="mailto:govillage@gmail.com">govillage@gmail.com</a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <Button>Contact Us Teacher</Button>
              </div>
            </div>
          </div>
          {/* ------------right side---------------- */}
          <div className="col-lg-9">
            <div className="teacher-details-right">
              <div className="teacher-details-right-title mb-5">
                <h4>Melvin Warner</h4>
                <span>teacher</span>
                <p>
                  Tempor orci dapibus ultrices in iaculis nunc sed augue.
                  Feugiat in ante metus dictum at tempor commodo. Venenatis
                  lectus magna fringilla urna porttitor rhoncus dolor. Arcu
                  dictum varius duis at consectetur lorem donec massa.
                </p>
                <p>
                  Tempor orci dapibus ultrices in iaculis nunc sed augue.
                  Feugiat in ante metus dictum at tempor commodo lectus magna
                  fringilla.
                </p>
              </div>
              <div className="teacher-details-right-content mb-5">
                <h4>Education:</h4>
                <p>
                  I’ve spent years figuring out the “formula” to teaching
                  technical skills in a classroom environment, and I’m really
                  excited to finally share my expertise with you. I can
                  confidently say that my online courses are without a doubt the
                  most comprehensive ones on the market.
                </p>
              </div>
              <div className="teacher-details-right-progress">
                <h4>Expertise & Skills:</h4>
                <TeachersProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDetails;
