import axios from 'axios'
import React from 'react'

const getLessonsByCId =async (courseId,setLessons) => {
  try{
const res=await axios.get(`http://localhost:1911/bycourse/${courseId}`)
 console.log("Response data:", res.data);
setLessons(res.data.data||[])
  }
  catch(err){
    console.error("Error fetching lessons:", err);
    setLessons([])
    
  }


  
}

export default getLessonsByCId