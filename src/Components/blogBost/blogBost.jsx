import { FaRegCalendarAlt, FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../Button/Button";
import "./blogBost.css";
import React, { useRef, useState } from "react";


function BlogPost({ imgUrl, galry = false }) {
    const boxRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    const goLeft = () => {
        if (currentIndex === 0 || currentIndex === 1) {
            if (currentIndex === 0) {
                boxRef.current.classList.add("go-left-from-zero");
            }
            if (currentIndex === 1) {
                boxRef.current.classList.remove("go-right-from-zero");
            }

            setCurrentIndex((prevIndex) => (prevIndex - 1));
        }




    };

    const goRigth = () => {
        if (currentIndex === 0 || currentIndex === -1) {
            if (currentIndex === -1) {
                boxRef.current.classList.remove("go-left-from-zero");

            }
            if (currentIndex === 0) {
                boxRef.current.classList.add("go-right-from-zero");
            }

            setCurrentIndex((prevIndex) => (prevIndex + 1));
        }

    }


    return (
        <>
            <div className="card border-0 p-0 mb-5 overflow-hidden">

                {!galry ? (
                    <div className="card-img-top d-flex w-100">
                        <img src={imgUrl} alt="Blog Post" className="w-100" />
                    </div>) : (
                    <>
                        <button className="btn blog-arrow-left btn-light fw-bold text-white align-self-center" onClick={goLeft} ><FaArrowLeft /> </button>

                        <button className="btn btn-light blog-arrow-right fw-bold text-white align-self-center" onClick={goRigth} ><FaArrowRight /></button>

                        <div ref={boxRef} className="card-img-top galry-style d-flex w-100">

                            <img src={imgUrl} className="w-100" alt="Blog Post" />
                            <img src="https://ordainit.com/html/educate/assets/img/blog/blog-sidebar-2.jpg" className="w-100" alt="Blog Post" />
                            <img src={imgUrl} className="w-100" alt="Blog Post" />
                        </div></>)}



                <div className="card-body p-0">
                    <div className="d-flex align-items-center  gap-4 text-secondary mb-4 mt-4">
                        <div className="d-flex gap-2">
                            <FaRegCalendarAlt color="#17a2b8" />
                            <span>April 21, 2023</span>
                        </div>
                        <div className="d-flex  gap-2">
                            <FaUser color="#17a2b8" />
                            <span>Alamgir Chowdhuri</span>
                        </div>
                    </div>

                    <h3 className="text-start mb-4">
                        <a href="" className="text-decoration-none text-start fw-bold">
                            Curabitur at fermentum purus. Interdum et malesuada fames ac ante
                            ipsum
                        </a>
                    </h3>

                    <Button children={"Read More"} />
                </div>
            </div>
        </>
    );
}

export default BlogPost;
