import { useEffect, useState } from "react";
import TeacherCard from "../../../Components/TeacherCard/TeacherCard";
import getAllInstructors from "../../../utilities/getAllInstructors";

function Teacher() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    getAllInstructors(setInstructors);
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {instructors?.length === 0 && (
            <div className="col-12 text-center py-4">
              No instructors available
            </div>
          )}
          {instructors?.map((instructor) => (
            <div className="col" key={instructor._id}>
              <TeacherCard instructor={instructor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Teacher;
