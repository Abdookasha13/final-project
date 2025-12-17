import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import getLessonsByCourseId from "../../../utilities/getLessonsByCId";


const CoursePlayer = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const data = await getLessonsByCourseId(courseId);
      setLessons(data);
    };
    fetchLessons();
  }, [courseId]);

  return (
    
    <div className="px-3 ">
   
      <VideoPlayer lessons={lessons} />
    </div>
  );
};

export default CoursePlayer;
