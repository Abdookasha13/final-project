import CourseCard from "../../../Components/coursecard/CourseCard";
import "./Courses.css";

function Courses() {
  return (
    <div>
      <div className="container coursecardcontainer px-0 mx-0 ">
        <div className="row g-4 ">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2 ">
              <CourseCard
                imgSrc={"Images/courseimg1.jpg"}
                title={"It statistics data science and Business analysis"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={"Images/courseimg2.jpg"}
                title={"It statistics data science and Business analysis"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={"Images/courseimg3.jpg"}
                title={"Bilginer Adobe Illustrator for Graphic Design"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={"Images/courseimg1.jpg"}
                title={"It statistics data science and Business analysis"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={"Images/courseimg2.jpg"}
                title={"It statistics data science and Business analysis"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={"Images/courseimg3.jpg"}
                title={"Bilginer Adobe Illustrator for Graphic Design"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
