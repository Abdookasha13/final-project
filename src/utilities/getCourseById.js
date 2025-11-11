import axios from 'axios'
import React from 'react'

const getCourseById = async(courseId,setCourse) => {
 try{
    console.log("Course ID:", courseId);
    const res= await axios.get(`http://localhost:1911/courses/${courseId}`)
    setCourse(res.data)
 }catch (err) {
    console.error("Error fetching course:", err);
    setCourse({})
}}

export default getCourseById