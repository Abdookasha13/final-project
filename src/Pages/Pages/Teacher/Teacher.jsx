import React from 'react'
import TeacherCard from '../../../Components/TeacherCard/TeacherCard'

function Teacher() {
  return (
    <>
<div className="container py-5">
        <div className="row">
      
    <TeacherCard />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-2.jpg"
    title={<a href="#">Esther Boyd</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-3.jpg"
    title={<a href="#">Jamie Keller</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-4.jpg"
    title={<a href="#">Jesus Pendley</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-1-5.jpg"
    title={<a href="#">Melvin Warner</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-1-6.jpg"
    title={<a href="#">Nancy Dickens</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-1-7.jpg"
    title={<a href="#">Harriet Graham</a>}
    />
    <TeacherCard 
    imgSrc="https://ordainit.com/html/educate/assets/img/team/team-1-8.jpg"
    title={<a href="#">Ernest Dustin</a>}
    />


        </div>
      </div>


    </>
  )
}

export default Teacher