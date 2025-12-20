import { useEffect, useState } from "react";
import TeacherCard from "../../../Components/TeacherCard/TeacherCard";
import getAllInstructors from "../../../utilities/getAllInstructors";
import { useTranslation } from "react-i18next";

function Teacher() {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    getAllInstructors(setInstructors);
  }, []);

  const staticTeachers = [
    {
      name: t("teacherCard.defaultName"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-3-1.jpg",
    },
    {
      name: t("teacherCard.EstherBoyd"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-3-2.jpg",
    },
    {
      name: t("teacherCard.JamieKeller"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-3-3.jpg",
    },
    {
      name: t("teacherCard.JesusPendley"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-3-4.jpg",
    },
    {
      name: t("teacherCard.MelvinWarner"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-1-5.jpg",
    },
    {
      name: t("teacherCard.NancyDickens"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-1-6.jpg",
    },
    {
      name: t("teacherCard.HarrietGraham"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-1-7.jpg",
    },
    {
      name: t("teacherCard.ErnestDustin"),
      profileImage: "https://ordainit.com/html/educate/assets/img/team/team-1-8.jpg",
    },
  ];

  const teachersToRender =
    instructors && instructors.length > 0 ? instructors : staticTeachers;

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {teachersToRender.map((teacher, index) => (
          <div className="col" key={teacher._id || index}>
            <TeacherCard instructor={teacher} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teacher;
